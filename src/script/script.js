
const todoData = [
	{ label: 'Wake ip', done: true, },
	{ label: 'Drinck a coffee', done: false, },
	{ label: 'create todolist', done: false, }
];
(!localStorage.getItem(['todoData'])) 
	? localStorage['todoData'] = JSON.stringify(todoData) : '';
	

class TodoApp {
		constructor(idTodo, clNameList, idItem, clsLabel, clsCheck) {
			this.todo = document.getElementById(idTodo);
			this.listItem = this.todo.querySelector(`.${clNameList}`);
			this.clsLabel = clsLabel;
			this.clsCheck = clsCheck;
			this.cleanItem = this.getClearItem(idItem);
			this.keyLocalSt = 'todoData';
			this.submitAction();
			this.removeItem();
			this.createList();
			this.changeStatus();
		};

		getClearItem = (id) => {
			const item = document.getElementById(id);
			const newItem = item.cloneNode(true);
			item.parentElement.removeChild(item);
			newItem.removeAttribute('id');
			return newItem;
		};

		createItem = ({ label, done }) => {
			const todoItem = this.cleanItem.cloneNode(true);
			todoItem.querySelector('.item__label').innerHTML = label;
			let item = todoItem.querySelector(`.${this.clsCheck}`).checked = done;
			return todoItem
		};

		submitAction = () => {
			this.todo.addEventListener('submit', (e) => {
				e.preventDefault();
				let value = document.forms.todos[0].value;
				const data = {label:value, done: false}
				this.listItem.appendChild(this.createItem(data));
				document.querySelector('.form__input').value = '';
				this.setStorage();
			});
		};
		changeStatus = () => {
			this.todo.addEventListener('change', () => {
				this.setStorage();
			});
		};

		editItem = () => {
			this.listItem.addEventListener('click', ({target}) => {
				if(target.closest('.edit')){
					document.createElement('input')
					// const selectedItem = target.closest('li');
					// const children = this.listItem.querySelectorAll('li');
					// children.forEach((item) => {
					// 	if(item === selectedItem){
					// 		this.listItem.removeChild(item);
					// 		this.setStorage();
					// 	};
					// });
				};
			});
		};
		removeItem = () => {
			this.listItem.addEventListener('click', ({target}) => {
				if(target.closest('.delete')){
					const selectedItem = target.closest('li');
					const children = this.listItem.querySelectorAll('li');
					children.forEach((item) => {
						if(item === selectedItem){
							this.listItem.removeChild(item);
							this.setStorage();
						};
					});
				};
			});
		};
		createData = () => {
			const list = Array.from(this.listItem.children);
			return list.map(item => {
				return {
					label:item.querySelector(`.${this.clsLabel}`).innerHTML,
					done:item.querySelector(`.${this.clsCheck}`).checked
				}
			})
		}

		setStorage = () => {
			const data = this.createData();
			localStorage[this.keyLocalSt] = JSON.stringify(data);
			console.log('set');
			
		};

		getStorage = () => {
			return (localStorage.getItem([this.keyLocalSt])) ? JSON.parse(localStorage[this.keyLocalSt]): '';
		};

		createList = () => {
			const dataList = this.getStorage(),
				listElements = document.createDocumentFragment();
			dataList.forEach(item => {
				listElements.appendChild(this.createItem(item));
			});
			this.listItem.appendChild(listElements);
		}

	};

const todo = new TodoApp('todoApp', 'list', 'clearItem', 'item__label', 'item__check');






