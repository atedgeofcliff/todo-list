<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
   
    public function authenticate(Request $request)
    {
        try {
            $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            ]);

            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();
                $user = Auth::user();
                if($user->is_master==$request->is_master){
                    return response()->json([
                        'status' => 'success',
                        'code' => 201,
                        'message' => 'Login successfully.',
                        'data' => $user->load("get_permission"),
        
                    ]);
                }
                else{
                    return response()->json([
                        'status' => 'error',
                        'code' => 500,
                        'message' => 'Wrong Url',
                        'data' => null,
                    ]);
                }
                
            }
            else{
                return response()->json([
                    'status' => 'error',
                    'code' => 500,
                    'message' => 'The provided credentials do not match our records.',
                    'data' => null,
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'message' => $e->getMessage(),
                'data' => null,
            ]);
        }

    
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);
        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'fix errors', 'errors' => $validator->errors()], 500);
        }
        $credentials = $request->only('email', 'password');
        if(auth()->attempt($credentials, $request->filled('remember'))) {
            return response()->json(['status' => true, 'user' => auth()->user()]);
        }
        return response()->json(['status' => false, 'message' => 'invalid username or password'], 500);
    }
}
