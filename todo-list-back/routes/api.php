<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    Route::get('/allTodos', [TodoController::class, 'index']);
    Route::get('/greeting', function () {
        return 'Hello World';
    });
    return $request->user();
});
// Route::get('/allTodos', 'TodoController@index'); 
Route::get('/todos', [TodoController::class, 'index']);
Route::post('/todos', [TodoController::class, 'create']);
Route::put('/todos/{id}', [TodoController::class, 'update']);
Route::delete('/todos/{id}', [TodoController::class, 'destroy']);


Route::get('/greeting', function () {
    return 'Hello World';
});