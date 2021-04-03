import Vue from 'vue'
import VueRouter from 'vue-router'
import Traffic from '@/components/Traffic.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    name: "main",
    component: Traffic,
    props: {timerStart: 'red'},
  },
  {
    path: "/red",
    name: "red",
    component: Traffic,
    props: {timerStart: 'red'},
  },
  {
    path: "/yellow",
    name: "yellow",
    component: Traffic,
    props: {timerStart: 'yellow'},

  },
  {
    path: "/green",
    name: "green",
    component: Traffic,
    props: {timerStart: 'green'},
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
