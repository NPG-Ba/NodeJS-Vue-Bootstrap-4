<template>
  <div class="hello">
     <div id="todo-list-example" class="container">
        <h1 class="text-center">List of Employee</h1>
        <br>
        <form v-on:submit.prevent="addNewEmp">
           <div class="form-group row">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Name</label>
              <div class="col-sm-6">
                 <input v-model="name" type="text" id="name" class="form-control form-control-sm" placeholder="Input name ... ">
              </div>
           </div>
           <div class="form-group row">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Age</label>
              <div class="col-sm-6">
                 <input v-model="age" type="number" id="age" class="form-control form-control-sm" placeholder="Input age ... ">
              </div>
           </div>
           <div class="form-group row">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Comment</label>
              <div class="col-sm-10">
                 <textarea type="text"  v-model="comment" class="form-control" id="comment" rows="3"></textarea>
              </div>
           </div>
           <div class="form-group row">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm"></label>
              <div class="col-sm-10">
                 <button v-if="this.isEdit == false" type="submit" class="btn btn-success">
                 Submit
                 </button>
                 <button v-else v-on:click="updateEmp()" type="button" class="btn btn-primary">
                 Update
                 </button>
                 <button  type="button" class="btn btn-danger">
                 Cannel
                 </button>
              </div>
           </div>
        </form>
        <table class="table">
           <tr v-for="(todo) in todos" v-bind:key="todo.id" v-bind:name="todo.name" v-bind:age="todo.age" v-bind:comment="todo.comment">
              <td class="text-left">{{todo.name}}</td>
              <td class="text-left">{{todo.age}}</td>
              <td class="text-left">{{todo.comment}}</td>
              <td class="text-right">
                 <button class="btn btn-info" v-on:click="editEmp(todo.name, todo.id,todo.age, todo.comment)">Edit</button>
                 <button class="btn btn-danger" v-on:click="deleteEmp(todo.id)">Delete</button>
              </td>
           </tr>
        </table>
        <br>
        <button type="button" class="btn btn-primary btn-sm">More</button>
     </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      todos: [],
      id: '',
      name: '',
      age: '',
      comment: '',
      isEdit: false
    }
  },
  mounted () {
    this.getEmp()
  },
  methods: {
    getEmp () {
      axios.get('/api/emp').then(
        result => {
          console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewEmp () {
      axios.post('/api/emp', {name: this.name, age: this.age, comment: this.comment})
        .then((res) => {
          this.name = ''
          this.getEmp()
        }).catch((err) => {
          console.log(err)
        })
    },
    editEmp (name, id, age, comment) {
      this.id = id
      this.name = name
      this.age = age
      this.comment = comment
      this.isEdit = true
    },
    updateEmp () {
      axios.put(`/api/emp/${this.id}`,
        {name: this.name, age: this.age, comment: this.comment})
        .then((res) => {
          this.name = ''
          this.age = ''
          this.comment = ''
          this.isEdit = false
          this.getEmp()
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteEmp (id) {
      axios.delete(`/api/emp/${id}`)
        .then((res) => {
          this.name = ''
          this.age = ''
          this.comment = ''
          this.getEmp()
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
