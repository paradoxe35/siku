<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class SalePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }


     /**
     * Determine if the given sale can be deleted by the user.
     *
     * @param  \App\User  $user
     * @return bool
     */
    public function delete(User $user)
    {
        return $user->super_admin
                ? Response::allow()
                : Response::deny(trans("Vous devez être un super administrateur."));
    }
}
