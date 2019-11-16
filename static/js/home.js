class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {flights: []};
    }

    componentDidMount() {
        this.fetchData()
    }

    getCookie = () =>  function(name) {
        var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
        return r ? r[1] : null;
    };


    fetchData = () => {
        this.setState({loading: true}, () => {
            fetch('graphql/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.getCookie('csrftoken')
                },
                body: JSON.stringify({
                    query: `query { todoItems { id text completed } }`,
                }),
            })
                .then(response => {
                    return response.json()
                })
                .then(responseAsJson => {
                    this.setState({loading: false, data: responseAsJson.data})
                })
        })
    }

    render() {
        return (
            <div className="flights">
                {this.state.flights}
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
