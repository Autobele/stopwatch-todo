<template>
  <div class="dashboard">
    <v-layout row class="mx-3">
      <v-flex xs12 md6>
        <h1 class="subtitle-1 grey--text">Dashboard</h1>
      </v-flex>
      <v-flex xs12 md6 right text-end class="">
        <v-dialog v-model="dialog" max-width="600px">
         <template v-slot:activator="{ on }">
           <v-btn small color="success" v-on="on" @click.stop="addTaskDialog">Add Task</v-btn>
        </template>
        <v-card v-on:keyup.enter="showBtnSave ? createTask : updateTask">
        <v-card-title>
          <span class="headline">New Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Title*" v-model="taskData.title"
                required
                hint="At least 8 characteres"
                :rules="required" 
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field 
                label="Assignee*"
                type="text"
                value="1"
                v-model="taskData.assignee"
                :rules="required" 
                required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning darken-1" text @click="closeModal">Close</v-btn>
          <v-btn v-if="showBtnSave" color="success darken-1" text @click="createTask">Save</v-btn>
          <v-btn v-else color="success darken-1" text @click="updateTask">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-flex>
      
    </v-layout>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-btn small text class="grey lighten-3 ml-2 my-2" @click="sortBy('title')">
          <v-icon small left>mdi-folder</v-icon>
          <span class="caption text-lowercase">By task name</span>
        </v-btn>
        <v-btn small text class="grey lighten-3 ml-2 my-2" @click="sortBy('assignee')">
          <v-icon small left>mdi-account</v-icon>
          <span class="caption text-lowercase">By Assignee</span>
        </v-btn>
        <v-btn small text class="grey lighten-3 ml-2 my-2" @click="sortBy('status')">
          <v-icon small lef>mdi-progress-check</v-icon>
          <span class="caption text-lowercase ml-2">By status</span>
        </v-btn>
      </v-layout>
      <v-card flat outlined class="pa-5 mb-3" v-for="project in projects" :key="project.title">
        <v-layout row wrap>
          <v-flex xs12 md12 lg3>
            <v-card-title class="caption grey--text">Task title</v-card-title>
            <v-card-text class="body-1">{{ project.title }}</v-card-text>
          </v-flex>
          <v-flex xs6 sm4 md3 lg2>
            <v-card-title class="caption grey--text justify-center">Assignee</v-card-title>
            <v-card-text class="text-center body-1">{{ project.assignee}}</v-card-text>
          </v-flex>
          <v-flex xs6 sm4 md2 lg2>
            <v-card-title class="caption grey--text justify-center">Created at</v-card-title>
            <v-card-text class="text-center body-1">{{ project.createdAt | moment("DD/MM/YYYY") }}</v-card-text>
          </v-flex>
          <v-flex xs6 sm4 md2 lg1 text-center>
            <v-card-title class="caption grey--text justify-center">Status</v-card-title>
            <v-chip
              small
              :color="setColorStatus(project.status)"
              class="text-center body-1 text-lowercase font-weight-700"
            >{{ project.status }}</v-chip>
          </v-flex>
          <v-flex xs6 sm6 md2 lg2 text-center>
            <v-card-title class="caption grey--text justify-center">Worktime</v-card-title>
            <v-card-text class="body-1">00:00:00</v-card-text>
          </v-flex>
          <v-flex xs12 sm6 md2 lg2 text-center>
            <v-card-title class="caption grey--text justify-center">Actions</v-card-title>
            <v-card-actions class="pa-0 justify-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text fab small v-on="on" @click="play(project._id)">
                    <v-icon color="success darken-1">mdi-play</v-icon>
                  </v-btn>
                </template>
                <span>play</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text fab small disabled class="mr-1" v-on="on">
                    <v-icon color="red darken-1">mdi-stop</v-icon>
                  </v-btn>
                </template>
                <span>stop</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text fab small class="mr-1 p-0" v-on="on" @click="showUpdateDialog(project)">
                    <v-icon color="blue darken-1">mdi-file-edit</v-icon>
                  </v-btn>
                </template>
                <span>edit</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text fab small class="mr-1 p-0" v-on="on" @click="doneTask(project)">
                    <v-icon color="grey darken-4">mdi-check</v-icon>
                  </v-btn>
                </template>
                <span>check</span>
              </v-tooltip>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      projects: [],
      dialog: false,
      taskData: {
        title: '',
        assignee: ''
      },
      taskEdit: {
      },
      required: [v => !!v || "The input is required"],
      minCaracteres: [v => v < 8 || "Minimum caractere 8"],
      showBtnSave: true
    };
  },
  methods: {
    setColorStatus(status) {
      if (status == "concluída") return "blue-grey white--text";
      if (status == "em andamento") return "success white--text";
      if (status == "pendente") return "orange white--text";
    },
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    listTasks() {
      this.axios.get('http://localhost:3000/api/v1/tasks')
        .then(res => {
          this.projects = [...res.data.data].filter(e => e.status !== 'concluída');
        })
        .catch(e => {
          console.error(e);
        })
    },
    createTask() {
      this.axios.post('http://localhost:3000/api/v1/tasks', this.taskData)
      this.taskData = {}
      this.dialog = false
      this.listTasks();
    },
    updateTask() {
      this.axios.put(`http://localhost:3000/api/v1/tasks/${this.taskData._id}`, this.taskData)
        .then(() => {
          this.listTasks();
        })
      this.dialog = false
    },
    doneTask(data) {
      data.status = 'concluída'
      this.axios.put(`http://localhost:3000/api/v1/tasks/${data._id}`, data)
        .then(() => {
          this.listTasks();
        })
      
    },
    addTaskDialog() {
      this.taskData = {}
      this.dialog = true
    },
    showUpdateDialog(data) {
      this.showBtnSave = false
      this.taskData.title = data.title
      this.taskData.assignee = data.assignee
      this.taskData._id = data._id
      this.dialog = true
    },
    closeModal(){
      this.taskData = {}
      this.dialog = false
    },
    play(id) {
      console.log(id)
    }
  },
  created(){
    this.listTasks();
  },
  mounted() {
    this.taskData.title = ''
    this.taskData.assignee = ''
  }
};
</script>

<style>
</style>