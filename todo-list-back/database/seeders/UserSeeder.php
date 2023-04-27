<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Permission;

use Illuminate\Support\Facades\DB;



class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
DB::table('permissions')->truncate();

DB::table('users')->truncate();
DB::statement('SET FOREIGN_KEY_CHECKS=1;');

       
        $users = [
            ['id' => '1', 'name' => 'masterUser','email' => 'master@master.com','password' =>  Hash::make('123456'),'is_master' => true],
            ['id' => '2', 'name' => 'user','email' => 'user@user.com','password' =>  Hash::make('123456'),'is_master' => false],     
        ];
        $permissions=[['user_id' => 2 ,'from_user_id' => 1,'create' => true,'read' => true,'update' => true,'delete' => true],['user_id' => 2, 'from_user_id' => 2,'create' => true,'read' => true,'update' => true,'delete' => true],];
        User::insert($users);
        
        Permission::insert($permissions);
    }
}
