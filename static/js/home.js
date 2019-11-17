class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timelines: [],
            loading: false
        };
    }

    async componentDidMount() {
        await this.fetchData()
    }

    getCookie(name) {
        const r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
        return r ? r[1] : null;
    };

    fetchData = async () => {
        this.setState({loading: true});

        const response = await fetch('graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCookie('csrftoken'),
            },
            body: JSON.stringify({
                query: `query { timelines { title, id, startingDate, endingDate } }`,
            }),
        });

        const results = await response.json();
        this.setState({loading: false, timelines: results.data.timelines})
    };

    render() {
        if (this.state.loading) {
            return <div className="text-center">
                <i className="loading fad fa-spinner fa-spin"></i>
            </div>
        }

        return <Timelines timelines={this.state.timelines} />
    }
}

function Timelines(data) {
    const {timelines} = data;

    return timelines.map((timeline, key) => {
        return <div className="row" key={key}>
            <div className="col-12">
                {timeline.title}. From {timeline.startingDate} to: {timeline.endingDate}
            </div>
        </div>
    });

}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
