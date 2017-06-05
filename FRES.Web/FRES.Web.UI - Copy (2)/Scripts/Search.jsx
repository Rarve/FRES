
var Images = React.createClass({
    render: function () {
        var images = this.props.images.map(function (image, index) {
            return (
                <img src={image} />
            );
        });
        return (
      <div>{images}</div>
    );
    }
});


var Product = React.createClass({
    render: function () {
        return (
        <div className="col-lg-6 col-xs-6">
            <div className="card-image"><img src={this.props.product.Images[0] + "a"} /></div>
            <div className="info">
                <div>{this.props.product.Code}</div>
                <div><a href={this.props.product.Url}>{this.props.product.Source}</a></div>
                <div>{this.props.product.Name}</div>
                <div>{this.props.product.Price}</div>
                <div>{this.props.product.SizeTotal}</div>
                <div>{this.props.product.SizeTotalUnit}</div>
                <div>{this.props.product.SizeTotalText}</div>
                <div>{this.props.product.BedRoom}</div>
                <div>{this.props.product.BathRoom}</div>
                <div>{this.props.product.Storeys}</div>
                <div>{this.props.product.ParkingSpace}</div>
                <div>{this.props.product.Desc}</div>
            </div>
        </div>
    );
    }
});

var Products = React.createClass({
    render: function () {
        var products = this.props.products.map(function (product, index) {
            return (
                <Product key={index} product={product} />
            );
        });
        return (
      <div>
          {products}
      </div>
    );
    }
});

var SearchForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var priceMin = this.refs.priceMin.value.trim();
        var priceMax = this.refs.priceMax.value.trim();
        this.props.onCommentSubmit({ PriceMin: priceMin, PriceMax: priceMax });
        return;
    },
    render: function () {
        return (
         <form className="searchForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Min Price" ref="priceMin" />
            <input type="text" placeholder="Max Price" ref="priceMax" />
            <input type="submit" value="Post" />
         </form>
    );
    }
});

var SearchBox = React.createClass({
    loadFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    handleFormSubmit: function (queryObj) {
        var data = new FormData();
        data.append('PriceMin', queryObj.PriceMin);
        data.append('PriceMax', queryObj.PriceMax);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send(data);
    },
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadFromServer();
    },
    render: function () {
        return (
            <div>
                <SearchForm onCommentSubmit={this.handleFormSubmit} />
                <Products products={this.state.data} />
                <Card style={{width: '350px' }}></Card>
            </div>
        );
    }
});

ReactDOM.render(
    <SearchBox url="/realestates/getall" submitUrl="/realestates/query" pollInterval={2000 } />,
    document.getElementById('root')
);