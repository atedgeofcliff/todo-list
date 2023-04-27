<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;



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
Route::group(['prefix' => 'api'], function () {
    // Route::post('/login', [LoginController::class, 'authenticate']);
    // Route::post('/register', [RegisterController::class, 'register']);
    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::post('/logout', [LoginController::class, 'logout']);
        Route::post('/me', [LoginController::class, 'me']);
    });
});



Route::post('/login', [LoginController::class, 'authenticate']);
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'create']);

Route::post('/UpdateUsersPermission', [UserController::class, 'updatePermission']);
Route::get('/usersPermissions/{id}', [UserController::class, 'getUserPermissions']);

/* Route::middleware('auth:sanctum')->get( '/user', function (Request $request) {
   
    return $request->user();
}); */
// Route::get('/allTodos', 'TodoController@index'); 
Route::get('/todos', [TodoController::class, 'index']);
Route::post('/todos', [TodoController::class, 'create']);
Route::put('/todos/{id}', [TodoController::class, 'update']);
Route::delete('/todos/{id}', [TodoController::class, 'destroy']);


Route::get('/greeting', function () {
    return 'Hello World';
});