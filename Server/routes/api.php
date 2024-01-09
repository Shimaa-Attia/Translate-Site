<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\PaypalController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\testController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::post('/ip',[testController::class,'ip']);
Route::get('/mail',[testController::class,'mail']);
Route::get('/lang/{lang?}',[testController::class,'lang']);

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
    //create
    Route::post('/',[PriceController::class,'create']);
    //update
    Route::put('/{id}',[PriceController::class,'update']);
    //price soft
    Route::delete('/delete/{id}',[PriceController::class,'destroy']);
    Route::get('/archive',[PriceController::class,'archive']);
    Route::post('/restore/{id}',[PriceController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[PriceController::class,'deleteArchive']);
     //search
     Route::get('/search/{key}',[PriceController::class,'search']);



});
Route::group(['prefix'=>'clients','as'=>'clients.'],function(){
    //select all
    Route::get('/',[ClientController::class,'all']);
    //show
    Route::get('/show/{id}',[ClientController::class,'show']);
    //create
    Route::post('/',[ClientController::class,'create']);
    //update
    Route::put('/{id}',[ClientController::class,'update']);
    // soft delete
    Route::delete('/delete/{id}',[ClientController::class,'destroy']);
    Route::get('/archive',[ClientController::class,'archive']);
    Route::post('/restore/{id}',[ClientController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[ClientController::class,'deleteArchive']);
     // search
     Route::get('/search/{key}',[ClientController::class,'search']);



});

Route::group(['prefix'=>'projects','as'=>'projects.'],function(){
    //select all
    Route::get('/',[ProjectController::class,'all']);
    //show
    Route::get('/show/{id}',[ProjectController::class,'show']);
    //create
    Route::post('/',[ProjectController::class,'create']);
    //update
    Route::put('/{id}',[ProjectController::class,'update']);
    // soft delete
    Route::delete('/delete/{id}',[ProjectController::class,'destroy']);
    Route::get('/archive',[ProjectController::class,'archive']);
    Route::post('/restore/{id}',[ProjectController::class,'restore']);
    Route::delete('/deleteArchive/{id}',[ProjectController::class,'deleteArchive']);
     //search
     Route::get('/search/{key}',[ProjectController::class,'search']);



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
