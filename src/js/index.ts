import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface ICoronaTest {
    testId: number
    machineName: string
    temperature: number
    location: string
    date: string
    time: string
}

let baseUrl: string = "https://coronatest.azurewebsites.net/api/CoronaTests"

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        tests: [],
        highTemp: []

    },
    methods: {
        getAllTests() {
            this.helperGetAndShow(baseUrl, "all")
        },
        helperGetAndShow(url: string, type: string) {
            axios.get<ICoronaTest[]>(url)
                .then((response: AxiosResponse<ICoronaTest[]>) => {
                    if (type == "all")
                        this.tests = response.data
                    else
                        this.highTemp = response.data
                })
                .catch((error: AxiosError) => {
                    //this.message = error.message
                    alert(error.message) // https://www.w3schools.com/js/js_popup.asp
                })
        },
        getAllWithHighTemperature() {
            let url = baseUrl + "/temperature"
            this.helperGetAndShow(url)
        }
    }

})