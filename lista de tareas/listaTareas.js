var data = {
    tareas: [{
            texto: 'Tarea 1',
            editando: false,
            terminada: false
        },
        {
            texto: 'Tarea 2',
            editando: false,
            terminada: false
        },
        {
            texto: 'Tarea 3',
            editando: false,
            terminada: false
        }
    ],
    nuevaTarea: ''
}

Vue.component('titulo', {
        template: '<h2>{{titulo}}</h2>',
        data: function() {
            return { titulo: 'Lista de Tareas - Adrian Flores Rangel' }
        }
    })
    //Al agregar  tambien se puede hacer preionando enter o haciendo click en el boton
Vue.component('Agregar', {
    template: `
            <div class="input-group">
              <input type="text" 
                      placeholder="Escribe una nueva tarea" 
                      v-model="nuevaTarea"
                      class="form-control"
                      v-on:keyup.enter="agregarTarea">
              <span class="input-group-btn">
                <button type="button" 
                        v-on:click="agregarTarea"
                        class="btn btn-primary">Agregar</button>
              </span>       
            </div>
            `,
    data: function() {
        return data;
    },
    methods: {
        agregarTarea: function() {
            var texto = this.nuevaTarea.trim();
            if (texto) {
                this.tareas.push({
                    texto: texto,
                    editando: false,
                    terminada: false
                })
            }
            this.nuevaTarea = '';
        }
    }
})

//En el boton verde indica que se cumplio con la tarea solo agrega una clase en css que le cambia el color y la decoracion
//Cuando se esta editando la tarea para indicar que se termino de editar cuento con un v-on:blur el cual cuando se sale del input lo desaparece cambiando su estado a false
// Falla un poco  v-on:keyup.enter="tarea.editando = !tarea.editando" no me dio tiempo de corregir este problema pero si esta funcionando

Vue.component('lista-de-tareas', {
    template: `
              <ul class="list-group">
                <li v-for="(tarea, indice) of tareas" class="list-group-item" v-bind:class="{terminada: tarea.terminada}">
                  {{ tarea.texto }}
                  <span class="pull-right">
                  <button type="button" class="btn btn-success btn-xs glyphicon glyphicon-ok"
                          v-on:click="tarea.terminada = !tarea.terminada"       
                  ></button>
                  <button type="button" class="btn btn-warning btn-xs glyphicon glyphicon-pencil"
                  v-on:click="tarea.editando = !tarea.editando"       
                  ></button>
                  <input type="text" v-show="tarea.editando" v-model="tarea.texto"  v-on:blur="tarea.editando = !tarea.editando" v-on:keyup.enter="tarea.editando = !tarea.editando">
                  <button type="button" class="btn btn-danger btn-xs glyphicon glyphicon-remove"
                          v-on:click="borrar(indice)"       
                  ></button>
                 
                </span>
                </li>
              </ul>
            `,
    data: function() {
        return data
    },
    methods: {
        borrar: function(indice) {
            this.tareas.splice(indice, 1)
        },
        editado: function() {
            this.tareas.editando = false;
        }
    }
})

var app = new Vue({
    el: '#app',
    data: data,
    methods: {

    }
})