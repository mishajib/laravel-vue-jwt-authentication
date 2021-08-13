<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Dashboard</div>
            <div class="card-body">
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Welcome Back!</strong> {{ $auth.user().name }} to User Dashboard.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <table class="table table-bordered text-center">
                    <tr>
                        <th>Name</th>
                        <td>
                            {{ $auth.user().name }}
                        </td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>
                            {{ $auth.user().email }}
                        </td>
                    </tr>
                    <tr>
                        <th>Joined Date</th>
                        <td>
                            {{ new Date($auth.user().created_at) }}
                        </td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>
                            <span class="badge badge-success">User</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //
        }
    },
    components : {
        //
    }
}
</script>
