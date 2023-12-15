<!--  Change Modal prop name -->

<template>
    <section :class="['absolute w-[100%] h-[100%] top-0 left-0 bg-black z-10', localModal ? 'block' : 'hidden']"
        @click="() => { localModal = false }">
        <div class="flex absolute p-5 bg-[#F5F5DC] text-black w-[50%] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded w-[20%] z-10"
            @click="$event.stopPropagation()">
            <input type="text" placeholder="Input new data" class="w-[100%] p-3 outline-none"
                @change="newLocalData = $event.target.value">
            <button class="ml-10 bg-white p-4 hovertext-black" @click="changeData(localModal, newLocalData)">Change</button>
        </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'change-modal',
    props: {
        modal: Boolean,
        newData: String,
        changeData: Function
    },
    data() {
        return {
            localModal: this.modal,
            newLocalData: this.newData
        }
    },
    watch: {
        modal(newVal) {
            this.localModal = newVal;
        },
        newData(newVal) {
            this.newLocalData = newVal;
        }
    }
  }
  </script>
  