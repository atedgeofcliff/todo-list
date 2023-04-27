<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Permission;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {   
        try {
            $users = User::where("is_master",false)->get()->load("get_permission");
            return response()->json([
                'status' => 'success',
                'code' => 201,
                'message' => 'Users listed',
                'data' => $users,

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
    public function create(Request $request)
    {
        try {
            $newUser=User::firstOrCreate([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
                "is_master"=>false,
            ]
            
        );
        $this->addPermission($newUser->id);
            return response()->json([
                'status'=>'success', 
                'code' => 201,
                'message'=>'User Created', 
                'data'=>$newUser->load("get_permission"),
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
    public function getUserPermissions($id){
        try {
            $permissionUser = Permission::where("from_user_id",$id)->first();
            return response()->json([
                'status' => 'success',
                'code' => 201,
                'message' => 'User Permission listed',
                'data' => $permissionUser,

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
    public function updatePermission(Request $request)
    {
        try {
            $key=$request["process"];
            $user_id=$request["id"];
            if($request["id"]===1)
            {$updatedUser = Permission::where('user_id', $user_id)->get();
            foreach ($updatedUser as $user) {
                # code...
                $user[$key] =$user[$key]?false:true; 
                $user->save(); 
            }}
            else{
                $updatedUser = Permission::where('from_user_id', $user_id)->first();
                $updatedUser->update([
                    $key => $updatedUser[$key]?false:true,
                ]);
            }
           
            return response()->json([
                'status' => 'success',
                'code' => 201,
                'message' => 'User Permission Updated',
                'data' => $updatedUser,
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
    private function addPermission($id){
        $permission=[['user_id' => $id ,'from_user_id' => $id,'create' => true,'read' => true,'update' => true,'delete' => true],
        ['user_id' => $id, 'from_user_id' => '1','create' => true,'read' => true,'update' => true,'delete' => true]
        ];
        Permission::insert($permission);
    }
}
