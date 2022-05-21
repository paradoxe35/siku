<?php

namespace Database\Seeders;

use App\Infrastructure\Vars\EmailApp;
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
        $email = env('APP_SUPER_ADMIN_EMAIL');
        $password = env('APP_SUPER_ADMIN_PASSWORD');
        if (!$email || !$password) {
            throw new \Exception('Email or password is empty');
            return;
        }
        DB::table('users')->insert([
            'name' => 'Siku Admin',
            'email' => $email,
            'password' => Hash::make($password),
            'phone' => '+250780000000',
            'is_admin' => true,
            'super_admin' => true,
            'admin_token' => Str::random(60),
            'created_at' => now()
        ]);
    }
}
