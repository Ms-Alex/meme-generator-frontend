export default function generateAdapter(apiUrl) {
    return {
        parseJson: function (response) { return response.json() },
        generateJSONHeaders: function () { return { 'Content-Type': 'application/json' } },

        index: function index(funct) {
            fetch(apiUrl).then(this.parseJson).then(funct)
        },

        create: function create(body, funct) {
            const postConfig = {
                method: 'POST',
                headers: this.generateJSONHeaders(),
                body: JSON.stringify(body)
            }

            fetch(apiUrl, postConfig).then(this.parseJson).then(funct)
        },

        update: function update(id, body) {
            const patchConfig = {
                method: 'PATCH',
                headers: this.generateJSONHeaders(),
                body: JSON.stringify(body)
            }

            fetch(`${apiUrl}/${id}`, patchConfig).then(this.parseJson)
        },

        toDelete: function toDelete(id) {
            fetch(`${apiUrl}/${id}`, { method: 'DELETE' }).then(this.parseJson)
        },

        show: function show(id, funct) {
            fetch(`${apiUrl}/${id}`).then(this.parseJson).then(funct)
        }
    }
}