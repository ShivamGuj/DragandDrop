// Getting the lists and reset button
const list_items = document.querySelectorAll(".list-item");
const lists = document.querySelectorAll(".list");

// The item that is dragged
let draggedItem = null;

// Event listeners for drag events
list_items.forEach(list_item => {
  list_item.addEventListener('dragstart', (e) => {
    list_item.classList.add('dragging')
    e.target.className += ' hold';
    list_item.classList.add('success')
  })

  list_item.addEventListener('dragend', () => {
    list_item.classList.remove('dragging')
    list_item.classList.remove('success')
    alert("Item Dragged");
  })
})

lists.forEach(list => {
  list.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(list, e.clientY)
    const list_item = document.querySelector('.dragging')
    if (afterElement == null) {
      list.appendChild(list_item)
    } else {
      list.insertBefore(list_item, afterElement)
    }
    
  })
})

function getDragAfterElement(list, y) {
  const list_itemElements = [...list.querySelectorAll('.list_item:not(.dragging)')]
  //Reduce function helps to determine the closest item which is near to cursor
  //Then determine the actual position of the items on our screen with respect to the mouse 
  return list_itemElements.reduce((closest, item) => {
    const box = item.getBoundingClientRect()
    //By using this we can drop the item above or below the other
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: item }
    } else {
      return closest
    }
    
  }, { offset: Number.NEGATIVE_INFINITY }).element
  
  
}
