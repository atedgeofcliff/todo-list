<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        try {
            $todos = Todo::all();
            return response()->json([
                'status' => 'success',
                'code' => 201,
                'message' => 'Todos listed',
                'data' => $todos,

            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => $e->getMessage(),
                'data' => null,
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        try {
            $newTodo=Todo::firstOrCreate([
                'name'=>$request->name,
                'description'=>$request->description,
                'due_date'=>$request->due_date,
                'is_done'=>$request->is_done,
            ]
          );
            return response()->json([
                'status'=>'success', 
                'code' => 201,
                'message'=>'Todo Created', 
                'data'=>$newTodo,
            ]);
        }
        catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => $e->getMessage(),
                'data' => null,
            ]);
        }

        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTodoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTodoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTodoRequest  $request
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        try {

            $updatedTodo = Todo::where('id', $id)->first();
            $updatedTodo->update([
                'is_done' => !$updatedTodo->is_done
            ]);
            return response()->json([
                'status' => 'success',
                'code' => 201,
                'message' => 'Todo Updated',
                'data' => $id,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => $e->getMessage(),
                'data' => null,
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $deletedTodo = Todo::where('id', $id)->delete();
            return response()->json([
                'status' => 'success',
                'code' => 201,
                'message' => 'Todo deleted',
                'data' => $id,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => $e->getMessage(),
                'data' => null,
            ]);
        }
    }
}
