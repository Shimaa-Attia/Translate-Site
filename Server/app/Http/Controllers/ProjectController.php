<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Client;
use App\Models\Field;
use App\Models\File;
use App\Models\Language_project;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function all()
    {
        $projects = Project::all()->sortByDesc("created_at");
        return
            ProjectResource::collection($projects);
    }

    public function show($id)
    {
        $project = Project::find($id);
        if ($project == null) {
            return response()->json([
                "message" => "Project not found"
            ], 404);
        }
        return new ProjectResource($project);
    }
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'feild_name' => 'required|exists:fields,name',
            'languages.*'=>'required|exists:languages,id',
            "attachments.*"=>'required|file|mimes:png,jpg,jpeg,gif,pdf,docx,xlsx',
            "client_email"=>'email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()], 400);
        }

        // dd($request->all());

        // return   json_encode( $request->all());


        $client = Client::where('email', $request->client_email)->get();
        $field = Field::where('name', $request->feild_name)->first('id');


        DB::transaction(function () use ($request,$client,$field) {

            $project = Project::create([
                "name" => $request->name,
                "client_id" => $client[0]->id,
                "field_id"=>$field->id,
                "country_id"=>$client[0]->country_id
            ]);
                //  $path = public_path('storage/files');
                    // $files =     $request->file('fiels');
            //       foreach ($files as $file) {
                        //  $newName = rand().'.'.$file->getClientOriginalExtention();
                        //  $file->move($path,$newName)
                //    }

            foreach($request->attachments as $attachment){
                $newName = Storage::putFile("files",$attachment);
                File::create([
                        "name" => $newName,
                        "project_id" => $project->id
                    ]);
            }

            foreach($request->languages as $language_id){
                Language_project::create([
                   'language_id'=>$language_id,
                   'project_id'=>$project->id
                ]);
            }

        });
        return response()->json([
            "message" => "Project addedd..",
        ]);

    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if ($project == null) {
            return response()->json([
                "message" => "Project not found"
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'feild_name' => 'required|exists:fields,name',

        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
            ], 409);
        }

        $field = Field::where('name', $request->feild_name)->first();
        // return $field;

        $project->update([
            "name" => $request->name,
            "field_id"=>$field->id
        ]);

        return response()->json([
            "message" => "Project updated..",
        ]);


    }

    public function destroy($id)
    {
        $project = Project::find($id);
        if ($project == null) {
            return response()->json([
                "message" => "Project not found"
            ], 404);
        }
        $project->delete();
        return response()->json([
            "message" => "Project archived"
        ], 200);
    }


    public function archive()
    {

        $projects = Project::onlyTrashed()->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'projects' =>  ProjectResource::collection($projects),
        ]);
    }

    public function restore($id)
    {
        $project = Project::onlyTrashed()->find($id);
        if ($project == null) {
            return response()->json([
                "message" => "Project not fpumd in archive"
            ], 404);
        }
        $project->restore();
        return response()->json([
            "message" => "Project restored",
            "project" => new ProjectResource($project)
        ], 200);
    }

    public function deleteArchive($id)
    {
        $project = Project::onlyTrashed()->find($id);
        if ($project == null) {
            return response()->json([
                "message" => "Project not found in archive"
            ], 404);
        }
        $project->forceDelete();
        return response()->json([
            "message" => "Project deleted"
        ], 200);
    }


    public function search($key)
    {
        $projects = project::where('name', 'like', "%$key%")
            ->orWhereHas('country', function ($query) use ($key) {
                $query->where('name', 'like', "%$key%");
            })
            ->orWhereHas('field', function ($query) use ($key) {
                $query->where('name', 'like', "%$key%");
            })
            ->orWhereHas('languages', function ($query) use ($key) {
                $query->where('name', 'like', "%$key%");
            })
            ->orderBy('created_at', 'DESC')->get();
        return ProjectResource::collection($projects);

    }
}
