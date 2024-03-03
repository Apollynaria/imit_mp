<template>
    <div class="w-90 mx-auto max-w-screen-lg">
  
      <h1 class="text-2xl font-bold underline ">
        Test page. Table and text
      </h1>
  
      <br>
  
      <table class="border-collapse border border-slate-500 ...">
        <thead>
          <tr>
            <th class="border border-slate-600 ...">State</th>
            <th class="border border-slate-600 ...">City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-700 ...">Indiana</td>
            <td class="border border-slate-700 ...">Indianapolis</td>
          </tr>
          <tr>
            <td class="border border-slate-700 ...">Ohio</td>
            <td class="border border-slate-700 ...">Columbus</td>
          </tr>
          <tr>
            <td class="border border-slate-700 ...">Michigan</td>
            <td class="border border-slate-700 ...">Detroit</td>
          </tr>
        </tbody>
      </table>
  
      <br>
  
      <span class="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
        Hello<br />
        World
      </span>
  
      <div
        class="bg-white shadow-[0_2px_18px_-6px_rgba(0,0,0,0.5)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
        <div class="px-4 my-6">
          <h3 class="text-lg font-semibold">Заголовок</h3>
          <p class="mt-2 text-sm text-gray-400">Какой-то текст...</p>
          <button type="button"
            class="px-6 py-2 mt-4 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600">Показать</button>
        </div>
      </div>
  
      <br>
  
      <div class="font-[sans-serif] space-x-4 space-y-4 text-center">
        <button type="button"
          class="px-6 py-2 rounded-full text-black text-sm tracking-wider font-medium outline-none border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">Кнопка 1</button>
        <button type="button"
          class="px-6 py-2 rounded-full text-black text-sm tracking-wider font-medium outline-none border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300">Кнопка 2</button>
        <button type="button"
          class="px-6 py-2 rounded-full text-black text-sm tracking-wider font-medium outline-none border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300">Кнопка 3</button>
        <button type="button"
          class="px-6 py-2 rounded-full text-black text-sm tracking-wider font-medium outline-none border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300">Кнопка 4</button>
        <button type="button"
          class="px-6 py-2 rounded-full text-black text-sm tracking-wider font-medium outline-none border-2 border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300">Кнопка 5</button>
        <button type="button"
          class="px-6 py-2 rounded-full text-black text-sm tracking-wider font-medium outline-none border-2 border-[#333] hover:bg-[#222] hover:text-white transition-all duration-300">Кнопка 6</button>
      </div>
  
      <div class="space-y-6">
  
        <div class="flex items-center">
          <input type="radio" class="w-5 h-5" />
          <label class="text-sm text-black ml-4">Выбор 1</label>
        </div>
  
        <div class="flex items-center">
          <input type="radio" class="w-5 h-5" checked />
          <label class="text-sm text-black ml-4">Выбор 2</label>
        </div>
  
        <div class="flex items-center">
          <input type="radio" class="w-5 h-5" disabled />
          <label class="text-sm text-gray-400 ml-4">Выбор 3</label>
        </div>

        <div class="flex items-center">
          <input type="radio" class="w-5 h-5" disabled />
          <label class="text-sm text-gray-400 ml-4">Выбор 3</label>
        </div>

        <div class="flex items-center">
          <input type="radio" class="w-5 h-5" disabled />
          <label class="text-sm text-gray-400 ml-4">Выбор 3</label>
        </div>

        <div class="flex items-center">
          <input type="radio" class="w-5 h-5" disabled />
          <label class="text-sm text-gray-400 ml-4">Выбор 3</label>
        </div>

        <div class="flex items-center">
          <input type="radio" class="w-5 h-5" disabled />
          <label class="text-sm text-gray-400 ml-4">Выбор 3</label>
        </div>
      </div>
      </div>
  </template>
    
  <script setup lang="ts">

  useSeoMeta({
    title: 'Тестовая страница',
  })
  

  </script>
    
  <style scoped>
  </style>