<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaypalController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('payment',[PaypalController::class,'payment'])->name('payment');
Route::get('cancel',[PaypalController::class,'cancel'])->name('payment.cancel');
Route::get('payment/success',[PaypalController::class,'success'])->name('payment.success');
