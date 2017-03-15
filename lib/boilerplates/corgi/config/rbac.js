module.exports = {
	rules: {
		superadmin: [
			"read-user",
			"add-user",
			"edit-user",
			"delete-user",

			"read-shop",
			"add-shop",
			"edit-shop",
			"delete-shop"
		]
	},
	menu: {
		superadmin: {
			user: ['list']
		}
	}
}
