<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Siku Admin',
            'email' => 'siku.admin@gmail.com',
            'password' => Hash::make('siku07860'),
            'phone' => '+250786081431',
            'is_admin' => true,
            'super_admin' => true,
            'admin_token' => Str::random(60),
            'created_at' => now()
        ]);
    }
}
