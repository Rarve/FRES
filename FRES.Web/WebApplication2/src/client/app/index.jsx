import React from 'react';
import { render } from 'react-dom';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

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
            //  <div className="card col-lg-4 col-xs-4">
            //     <img src={this.props.product.Images[0]} />
            //     <div className="info">
            //         <div>{this.props.product.Code}</div>
            //         <div><a href={this.props.product.Url}>{this.props.product.Source}</a></div>
            //         <div>{this.props.product.Name}</div>
            //         <div>{this.props.product.Price}</div>
            //         <div>{this.props.product.SizeTotal}</div>
            //         <div>{this.props.product.SizeTotalUnit}</div>
            //         <div>{this.props.product.SizeTotalText}</div>
            //         <div>{this.props.product.BedRoom}</div>
            //         <div>{this.props.product.BathRoom}</div>
            //         <div>{this.props.product.Storeys}</div>
            //         <div>{this.props.product.ParkingSpace}</div>
            //         <div>{this.props.product.Desc}</div>
            //     </div>
            //  </div>
            <div className="col-lg-6 col-xs-12">
                <div className="card card-block">
                    <img className="img-responsive" src={this.props.product.Images[0]} alt={this.props.product.Name} />
                    <div className="card-block">
                        <h4 className="card-title">{this.props.product.Name}</h4>
                        <h4 className="card-title">{this.props.product.Price}</h4>
                        <p className="card-text">
                            <span className="glyphicon glyphicon-usd" aria-hidden="true"></span>{" " + this.props.product.Price}
                            <span className="glyphicon glyphicon-bed" aria-hidden="true"></span>{" " + this.props.product.BedRoom}
                            <span className="glyphicon glyphicon-bed" aria-hidden="true"></span>{" " + this.props.product.BathRoom}
                            <span className="glyphicon glyphicon-bed" aria-hidden="true"></span>{" " + this.props.product.Storeys}
                            <span className="glyphicon glyphicon-bed" aria-hidden="true"></span>{" " + this.props.product.SizeTotalText}
                            {this.props.product.Desc}
                        </p>
                        <a href={this.props.product.Url} className="btn btn-primary">Go somewhere</a>
                    </div>
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
            </div>
        );
    }
});

render(
    <SearchBox url="/RealEstates/GetAllAsync" submitUrl="/RealEstates/QueryAsync" />,
    document.getElementById('app')
);

