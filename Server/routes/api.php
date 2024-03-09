<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PaypalController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\CustomFieldController;
use App\Http\Controllers\PreviousClientsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/ip',[PositionController::class,'ipDetails']);
Route::get('/mail',[PositionController::class,'mail']);
Route::get('/lang/{lang?}',[PositionController::class,'lang']);

Route::get('payment',[PaypalController::class,'payment'])->name('payment');
Route::get('cancel',[PaypalController::class,'cancel'])->name('payment.cancel');
Route::get('payment/success',[PaypalController::class,'success'])->name('payment.success');


//login
Route::post('/login',[UserController::class,'login']);
Route::post('/register',[UserController::class,'register']);


Route::middleware(['auth:api'])->group(function(){});
    //checke auth
    Route::get("/users/auth", [UserController::class,'checkAuth']);
    //logout
    Route::post('/logout',[UserController::class,'logout']);
    Route::group(['prefix'=>'users','as'=>'users.'],function(){
    //select all
    // Route::get('/',[UserController::class,'all']);
    //select one
    Route::get('/show/{id}',[UserController::class,'show']);
    //update
    Route::put('/{id}',[UserController::class,'update']);
    //soft delete
    Route::delete('/delete/{id}',[UserController::class,'destroy']);
    Route::get('/archive',[UserController::class,'archive']);
    Route::post('/restore/{id}',[UserController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[UserController::class,'deleteArchive']);
    //changePassword
    Route::post('/changePassword',[UserController::class,'changePassword']);
    //forgotPassword
    Route::post('/forgotPassword',[UserController::class,'forgotPassword']);
    //resetPassword
    Route::post('/resetPassword',[UserController::class,'resetPassword']);
});


Route::group(['prefix'=>'countries','as'=>'countries.'],function(){
    //select all
    Route::get('/',[CountryController::class,'all']);
    //select one
    Route::get('/show/{id}',[CountryController::class,'show']);
    //create
    Route::post('/',[CountryController::class,'create']);
    //update
    Route::put('/{id}',[CountryController::class,'update']);
    //soft delete
    Route::delete('/delete/{id}',[CountryController::class,'destroy']);
    Route::get('/archive',[CountryController::class,'archive']);
    Route::post('/restore/{id}',[CountryController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[CountryController::class,'deleteArchive']);
     //search
    Route::get('/search/{key}',[CountryController::class,'search']);
});

Route::group(['prefix'=>'languages','as'=>'languages.'],function(){
    //select all
    Route::get('/',[LanguageController::class,'all']);
    //select one
    Route::get('/show/{id}',[LanguageController::class,'show']);
    //create
    Route::post('/',[LanguageController::class,'create']);
    //update
    Route::put('/{id}',[LanguageController::class,'update']);
    //soft delete
    Route::delete('/delete/{id}',[LanguageController::class,'destroy']);
    Route::get('/archive',[LanguageController::class,'archive']);
    Route::post('/restore/{id}',[LanguageController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[LanguageController::class,'deleteArchive']);
     //search
    Route::get('/search/{key}',[LanguageController::class,'search']);
});

Route::group(['prefix'=>'fields','as'=>'fields.'],function(){
    //select all
    Route::get('/',[FieldController::class,'all']);
    //show
    Route::get('/show/{id}',[FieldController::class,'show']);
    //create
    Route::post('/',[FieldController::class,'create']);
    //update
    Route::put('/{id}',[FieldController::class,'update']);
    // soft delete
    Route::delete('/delete/{id}',[FieldController::class,'destroy']);
    Route::get('/archive',[FieldController::class,'archive']);
    Route::post('/restore/{id}',[FieldController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[FieldController::class,'deleteArchive']);
     //search
     Route::get('/search/{key}',[FieldController::class,'search']);



});
Route::group(['prefix'=>'prices','as'=>'prices.'],function(){
    //select all
    Route::get('/',[PriceController::class,'all']);
    //show
    Route::get('/show/{id}',[PriceController::class,'show']);
    //update
    Route::put('/{id}',[PriceController::class,'update']);

     //search
     Route::get('/search/{key}',[PriceController::class,'search']);



});
Route::group(['prefix'=>'clients','as'=>'clients.'],function(){
    //select all
    Route::get('/',[ClientController::class,'all']);
    //show
    Route::get('/show/{id}',[ClientController::class,'show']);
    //create
    // Route::post('/',[ClientController::class,'create']);
    //update
    Route::put('/{id}',[ClientController::class,'update']);
    // soft delete
    Route::delete('/delete/{id}',[ClientController::class,'destroy']);
    Route::get('/archive',[ClientController::class,'archive']);
    Route::post('/restore/{id}',[ClientController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[ClientController::class,'deleteArchive']);
    // search
    Route::get('/search/{key}',[ClientController::class,'search']);
    //my projects
    Route::post('/myProjects',[ClientController::class,'myProjects']);
});

Route::group(['prefix'=>'projects','as'=>'projects.'],function(){
    //select all
    Route::get('/',[ProjectController::class,'all']);
    //show
    Route::get('/show/{id}',[ProjectController::class,'show']);
    //calculatePrice
    Route::post('/',[ProjectController::class,'calculatePrice']);
    //interprettercalculatePrice
    Route::post('/intrepretterPrice',[ProjectController::class,'intrepretterCalculatePrice']);
    //FasterDeliveryDate
    Route::post('/FasterDeliveryDate',[ProjectController::class,'FasterDeliveryDate']);
    //completeInfo (create project & create or update client)
    Route::post('/completeInfo',[ProjectController::class,'completeInfo']);
    //interprettercompleteInfo (create project & create or update client)
    Route::post('/interprettercompleteInfo',[ProjectController::class,'interprettercompleteInfo']);
    //update
    Route::put('/{id}',[ProjectController::class,'update']);
    // soft delete
    Route::delete('/delete/{id}',[ProjectController::class,'destroy']);
    Route::get('/archive',[ProjectController::class,'archive']);
    Route::post('/restore/{id}',[ProjectController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[ProjectController::class,'deleteArchive']);
    //search
    Route::get('/search/{key}',[ProjectController::class,'search']);
    //update status
    Route::put('/updateStatus/{id}',[ProjectController::class,'updateStatus']);
});

Route::group(['prefix'=>'packages','as'=>'packages.'],function(){
    //select all
    Route::get('/',[PackageController::class,'all']);
    //show
    Route::get('/show/{id}',[PackageController::class,'show']);
    //create
    Route::post('/',[PackageController::class,'create']);
    //update
    Route::put('/{id}',[PackageController::class,'update']);
    // soft delete
    Route::delete('/delete/{id}',[PackageController::class,'destroy']);
    Route::get('/archive',[PackageController::class,'archive']);
    Route::post('/restore/{id}',[PackageController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[PackageController::class,'deleteArchive']);
     //search
     Route::get('/search/{key}',[PackageController::class,'search']);
});

//projectStatus ,  homeDescription ,///مش هينفع aboutUs , ourServices
Route::group(['prefix'=>'customFields','as'=>'customFields.'],function(){
    //getCustomList
    Route::get('/getCustomList/{type}',[CustomFieldController::class,'getCustomList']);
    //select one
    Route::get('/show/{id}',[CustomFieldController::class,'show']);
    //create
    Route::post('/{type}',[CustomFieldController::class,'create']);
    //update
    Route::put('/{id}',[CustomFieldController::class,'update']);
    //soft delete
    Route::delete('/delete/{id}',[CustomFieldController::class,'destroy']);
    Route::get('{type}/archive/',[CustomFieldController::class,'archive']);
    Route::post('/restore/{id}',[CustomFieldController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[CustomFieldController::class,'deleteArchive']);

});

//pervclrnts
Route::group(['prefix'=>'previousClients','as'=>'previousClients'],function(){
    //select all
    Route::get('/',[PreviousClientsController::class,'all']);
    //show
    Route::get('/show/{id}',[PreviousClientsController::class,'show']);
    //create
    Route::post('/',[PreviousClientsController::class,'create']);
    //update
    Route::put('/{id}',[PreviousClientsController::class,'update']);
    // soft delete
    Route::delete('/delete/{id}',[PreviousClientsController::class,'destroy']);
    Route::get('/archive',[PreviousClientsController::class,'archive']);
    Route::post('/restore/{id}',[PreviousClientsController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[PreviousClientsController::class,'deleteArchive']);
     //search
     Route::get('/search/{key}',[PreviousClientsController::class,'search']);
});

Route::group(['prefix'=>'reviews','as'=>'reviews.'],function(){
    //select all
    Route::get('/',[ReviewController::class,'all']);
    //show
    Route::get('/show/{id}',[ReviewController::class,'show']);
    //create
    Route::post('/',[ReviewController::class,'create']);
    //update
    Route::put('/{id}',[ReviewController::class,'update']);
    // soft delete
    Route::delete('/delete/{id}',[ReviewController::class,'destroy']);
    Route::get('/archive',[ReviewController::class,'archive']);
    Route::post('/restore/{id}',[ReviewController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[ReviewController::class,'deleteArchive']);
    //search
    Route::get('/search/{key}',[ReviewController::class,'search']);
});

Route::group(['prefix'=>'services','as'=>'services'],function(){
    //select all
    Route::get('/',[ServiceController::class,'all']);
    //show
    Route::get('/show/{id}',[ServiceController::class,'show']);
    //create
    Route::post('/',[ServiceController::class,'create']);
    //update
    Route::put('/{id}',[ServiceController::class,'update']);
    // soft delete
    Route::delete('/delete/{id}',[ServiceController::class,'destroy']);
    Route::get('/archive',[ServiceController::class,'archive']);
    Route::post('/restore/{id}',[ServiceController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[ServiceController::class,'deleteArchive']);
     //search
     Route::get('/search/{key}',[ServiceController::class,'search']);
});
Route::group(['prefix'=>'about','as'=>'about'],function(){
    //select all
    Route::get('/',[AboutUsController::class,'all']);
    //show
    Route::get('/show/{id}',[AboutUsController::class,'show']);
    //create
    Route::post('/',[AboutUsController::class,'create']);
    //update
    Route::put('/{id}',[AboutUsController::class,'update']);
    // soft delete
    Route::delete('/delete/{id}',[AboutUsController::class,'destroy']);
    Route::get('/archive',[AboutUsController::class,'archive']);
    Route::post('/restore/{id}',[AboutUsController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[AboutUsController::class,'deleteArchive']);
     //search
     Route::get('/search/{key}',[AboutUsController::class,'search']);
});
