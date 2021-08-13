<template>
    <div id="main">
        <header id="header">
            <h1 class="text-center">
                Laravel Vue SPA
            </h1>
            <navigationMenu></navigationMenu>
        </header>
        <div id="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import navigationMenu from './Menu'

export default {
    name       : "IndexComponent",
    components : {
        navigationMenu
    }
}
</script>
