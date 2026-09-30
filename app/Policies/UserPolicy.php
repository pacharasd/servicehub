<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the operator can browse user listings (GET /api/users).
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('super-admin')
            || $user->hasRole('admin')
            || $user->can('users.view');
    }

    /**
     * Determine whether the operator can view a specific user's details.
     */
    public function view(User $user, User $model): bool
    {
        if ($user->id === $model->id) {
            return true;
        }

        return $user->hasRole('super-admin')
            || $user->hasRole('admin')
            || $user->can('users.view');
    }

    /**
     * Determine whether the operator can create new user accounts (POST /api/users).
     */
    public function create(User $user): bool
    {
        return $user->hasRole('super-admin')
            || $user->hasRole('admin')
            || $user->can('users.create');
    }

    /**
     * Determine whether the operator can update an existing user account (PUT /api/users/{user}).
     */
    public function update(User $user, User $model): bool
    {
        $hasBasePermission = $user->hasRole('super-admin')
            || $user->hasRole('admin')
            || $user->can('users.update');

        if (! $hasBasePermission) {
            return false;
        }

        // Non-super-admins cannot update super-admin accounts
        if ($model->hasRole('super-admin') && ! $user->hasRole('super-admin')) {
            return false;
        }

        return true;
    }

    /**
     * Determine whether the operator can toggle active/inactive status (PATCH /api/users/{user}/status).
     */
    public function toggleStatus(User $user, User $model): bool
    {
        $hasBasePermission = $user->hasRole('super-admin')
            || $user->hasRole('admin')
            || $user->can('users.disable');

        if (! $hasBasePermission) {
            return false;
        }

        // Non-super-admins cannot toggle status of super-admin accounts
        if ($model->hasRole('super-admin') && ! $user->hasRole('super-admin')) {
            return false;
        }

        return true;
    }

    /**
     * Alias for toggleStatus matching Spatie 'users.disable' permission naming.
     */
    public function disable(User $user, User $model): bool
    {
        return $this->toggleStatus($user, $model);
    }

    /**
     * Determine whether the operator can trigger an administrative password reset.
     */
    public function resetPassword(User $user, User $model): bool
    {
        $hasBasePermission = $user->hasRole('super-admin')
            || $user->hasRole('admin')
            || $user->can('users.update');

        if (! $hasBasePermission) {
            return false;
        }

        // Non-super-admins cannot reset password of super-admin accounts
        if ($model->hasRole('super-admin') && ! $user->hasRole('super-admin')) {
            return false;
        }

        return true;
    }

    /**
     * Determine whether the operator can assign a specific role.
     */
    public function assignRole(User $user, string $role): bool
    {
        // Only super-admin can assign super-admin role
        if ($role === 'super-admin') {
            return $user->hasRole('super-admin');
        }

        return $user->hasRole('super-admin')
            || $user->hasRole('admin')
            || $user->can('users.create')
            || $user->can('users.update');
    }

    /**
     * Determine whether the operator can permanently delete a user account.
     * Hard deletion is strictly barred across all roles to protect foreign keys.
     */
    public function delete(User $user, User $model): bool
    {
        return false;
    }
}
