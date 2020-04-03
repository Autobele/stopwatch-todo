<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Projects</h1>

    <v-container class="my-5">
      <v-expansion-panels popout>
         <v-expansion-panel :class="setColorStatus(project.status)" v-for="project in projects" :key="project._id">
          <v-expansion-panel-header class="font-weight-bold">{{ project.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="text-center my-3" v-if="project.status == 'concluída'">
              <v-btn text small class="mr-1">
                <span class="caption mr-3">Reopen</span> <v-icon color="info ligthen-2">mdi-folder-open</v-icon>
              </v-btn>
            </div>
            <h3 class="subtitle-1">{{ project.worktimes }}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h3>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Projects",
  data() {
    return {
      projects: []
    }
  },
  methods: {
    listTasks() {
      this.axios.get('http://localhost:3000/api/v1/tasks')
        .then(res => {
          this.projects = res.data.data
        })
        .catch(e => {
          console.error(e);
        })
    },
    setColorStatus(status) {
      if (status == "concluída") return "done";
      if (status == "em andamento") return "inProgress";
      if (status == "pendente") return "pending";
    },
  },
  created() {
    this.listTasks();
  }
};
</script>

<style>
  .inProgress {
    border-left: 4px solid #3cd1c2;
  }
  .pending {
    border-left: 4px solid orange;
  }
  .done {
    border-left: 4px solid #607D8B;
  }
</style>