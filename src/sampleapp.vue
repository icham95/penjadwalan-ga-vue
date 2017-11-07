<template>
  <v-app light>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      enable-resize-watcher
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click.prevent
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="miniVariant = !miniVariant" light></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <v-slide-y-transition mode="out-in">
            <v-layout column>
              <router-view></router-view>
            </v-layout>
          </v-slide-y-transition>
        </v-container>
      </v-content>
    </main>
    <v-footer fixed app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        miniVariant: true,
        title: 'Penjadwalan'
      }
    }
  }
</script>
