/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
   let homeworkContainer = document.querySelector('#app');

   let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
  
   let addNameInput = homeworkContainer.querySelector('#add-name-input');
   
   let addValueInput = homeworkContainer.querySelector('#add-value-input');
  
   let addButton = homeworkContainer.querySelector('#add-button');
  
   let listTable = homeworkContainer.querySelector('#list-table tbody');
   
   filterNameInput.addEventListener('input', function () {
    listTable.innerHTML = ''
    if (filterNameInput.value !== '') {
      let cookie = getCookie();
      for (const key in cookie) {
        
        const value = cookie[key];
        if(key) {
          if (value.indexOf(filterNameInput.value) != -1 || key.indexOf(filterNameInput.value) != -1) {
            
            let newRow = listTable.insertRow();
            let newCell;
            newCell = newRow.insertCell(-1);
            newCell.textContent = key;
      
            newCell = newRow.insertCell(-1);
            newCell.textContent = cookie[key];
      
            newCell = newRow.insertCell(-1);
            let button = document.createElement('button');
            button.textContent = 'Удалить'
            newCell.append(button)
      
            deleteCookie(button, newRow)     
          }
      }
      
      }
      
  
  } else {
  
    insertCookie()
   
    }
  });
  
  
  
  
  addButton.addEventListener('click', () => {
      let newCell;
      let newCoookie = addNameInput.value+'='+addValueInput.value;
      document.cookie = newCoookie;
  
      let newRow = listTable.insertRow();
      newCell = newRow.insertCell(-1);
      newCell.textContent = addNameInput.value;
  
      newCell = newRow.insertCell(-1);
      newCell.textContent = addValueInput.value;
  
      newCell = newRow.insertCell(-1);
      let button = document.createElement('button');
      button.textContent = 'Удалить'
      newCell.append(button)
  
      deleteCookie(button, newRow)
  
  });
  
  
  function insertCookie() {
      let cookie = getCookie()
      let newCell;
      for (const key in cookie) {
    
          const value = cookie[key];
        
          let newRow = listTable.insertRow();
          newCell = newRow.insertCell(-1);
          newCell.textContent = key;
    
          newCell = newRow.insertCell(-1);
          newCell.textContent = cookie[key];
    
          newCell = newRow.insertCell(-1);
          let button = document.createElement('button');
          button.textContent = 'Удалить'
          newCell.append(button)
    
          deleteCookie(button, newRow)
    }
  }
  
  function deleteCookie(button, row) {
    button.addEventListener('click', (e) => {
      let currentCookie = e.target.parentNode.parentNode.firstChild.textContent;
      document.cookie = currentCookie +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      row.remove()
    });  
  }
  
  function getCookie() {
    return document.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
      prev[name] = value;
      return prev;
   }, {});
  }
  insertCookie()
  