var ProductItem = React.createClass({
    render: function () {
        return (
        <div>
            <div>{this.props.product.Code}</div>
            <div>{this.props.product.Source}</div>
            <div>{this.props.product.Url}</div>
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
    );
    }
});

var ProductList = React.createClass({
    render: function () {
        var products = this.props.products.map(function (product, index) {
            return (
                <ProductItem key={index} product={product} />
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
         <form className="commentForm" onSubmit={this.handleSubmit}>
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
         <form className="searchForm" onSubmit={this.handleSubmit}>
            <SearchForm onCommentSubmit={this.handleFormSubmit} />
            <ProductList products={this.state.data} />
         </form>
        );
    }
});

var products = [{ "": "BKK5506", "SourceCode": "GSB", "Url": "http://properties.gsb.or.th/properties/prop_detail.php?page=home&ID=3613", "Name": null, "Price": 22000000.0, "SizeTotal": "151.70", "SizeTotalUnit": null, "SizeTotalText": null, "BedRooom": null, "BathRoom": null, "Storeys": null, "ParkingSpace": null, "Desc": "BKK5506 ขายร่วมกับ BKK5499 เนื้อที่รวม 2 แปลง 287.70 ตร.ว. ราคารวม 2 แปลง  22,000,000.- บาท (อาคารพักอาศัย 4 ชั้น)  งาน NPA & Resale Home 2016 ณ ศูนย์การประชุมแห่งชาติสิริกิติ์  ราคาพิเศษ  18,700,000.- บาท  รับจองซื้อภายในบูธกิจกรรม วันที่ 18-21 ส.ค. 59  ณ ศูนย์การประชุมแห่งชาติสิริกิติ์ เท่านั้น และวันที่ 22-31 ส.ค. 59 รับจองซื้อผ่านธนาคารออมสินทุกสาขาทั่วประเทศ", "SizeUtility": null, "Width": null, "WidthRoadFrontage": null, "Depth": null, "Age": null, "PropertyType": "อาคารพาณิชย์", "DocumentOfRightType": null, "DocumentOfRightDesc": null, "Promotion": null, "Remark": null, "RealEstateCondition": null, "Owner": null, "Project": null, "Timestamp": null, "ValidUntil": null, "Icon": null, "IsSoldOut": false, "Images": ["/upload/properties/BKK5506/1347628259-1.jpg", "/upload/properties/BKK5506/1347628259-2.JPG", "/upload/properties/BKK5506/1347628259-3.JPG", "/upload/properties/BKK5506/1347628259-4.JPG", "/upload/properties/BKK5506/1347628259-5.JPG", "/upload/properties/BKK5506/1347628259-6.JPG", "/upload/properties/BKK5506/1347628259-7.jpg", "/upload/properties/BKK5506/1347628259-8.jpg", "/upload/properties/BKK5506/1347628259-9.JPG"], "Map": { "Lat": 0.0, "Lon": 0.0, "Images": ["/upload/properties/BKK5506/1347628259-11.JPG"], "ParcelNumber": ["โฉนดที่ดิน", "9265"], "Desc": null, "Number": "644/202", "Village": "สวนนวกานต์", "VillageNo": null, "Alley": null, "Lane": null, "Road": "เสรีไทย", "SubDistrict": "คลองกุ่ม", "District": "บึงกุ่ม", "Province": "กรุงเทพฯ" }, "Contacts": [] }, { "Code": "AYA5401", "Source": "GSB", "Url": "http://properties.gsb.or.th/properties/prop_detail.php?page=home&ID=2168", "Name": null, "Price": 11223000.0, "SizeTotal": "82.00", "SizeTotalUnit": null, "SizeTotalText": null, "BedRooom": null, "BathRoom": null, "Storeys": null, "ParkingSpace": null, "Desc": "อาคาร  6  ชั้น  สร้างเป็นห้องพัก  รวม 49 ห้อง  งาน NPA & Resale Home 2016 ณ ศูนย์การประชุมแห่งชาติสิริกิติ์  ราคาพิเศษ  9,540,000.- บาท  รับจองซื้อภายในบูธกิจกรรม วันที่ 18-21 ส.ค. 59  ณ ศูนย์การประชุมแห่งชาติสิริกิติ์ เท่านั้น และวันที่ 22-31 ส.ค. 59 รับจองซื้อผ่านธนาคารออมสินทุกสาขาทั่วประเทศ", "SizeUtility": null, "Width": null, "WidthRoadFrontage": null, "Depth": null, "Age": null, "PropertyType": "อาคารพาณิชย์", "DocumentOfRightType": null, "DocumentOfRightDesc": null, "Promotion": null, "Remark": null, "RealEstateCondition": null, "Owner": null, "Project": null, "Timestamp": null, "ValidUntil": null, "Icon": null, "IsSoldOut": false, "Images": ["/upload/properties/AYA5401/1408086596-Slide1.JPG", "/upload/properties/AYA5401/1408086596-Slide2.JPG", "/upload/properties/AYA5401/1408086596-Slide3.JPG", "/upload/properties/AYA5401/1408086596-Slide5.JPG", "/upload/properties/AYA5401/1408086596-Slide6.JPG", "/upload/properties/AYA5401/1408086596-Slide7.JPG", "/upload/properties/AYA5401/1408086596-Slide8.JPG", "/upload/properties/AYA5401/1408086596-Slide9.JPG", "/upload/properties/AYA5401/1455504666-Slide1.JPG"], "Map": { "Lat": 0.0, "Lon": 0.0, "Images": ["/upload/properties/AYA5401/1363056164-10.JPG", "/upload/properties/AYA5401/1363056164-11.JPG", "/upload/properties/AYA5401/1363056164-12.JPG", "/upload/properties/AYA5401/1363056164-13.JPG", "/upload/properties/AYA5401/1363056164-14.JPG"], "ParcelNumber": ["โฉนดที่ดิน", "25366"], "Desc": null, "Number": "9/24", "Village": null, "VillageNo": "4", "Alley": null, "Lane": null, "Road": null, "SubDistrict": "คานหาม", "District": "อุทัย", "Province": "พระนครศรีอยุธยา" }, "Contacts": [] }, { "Code": "PKN570031", "Source": "GSB", "Url": "http://properties.gsb.or.th/properties/prop_detail.php?page=home&ID=7607", "Name": null, "Price": 9100000.0, "SizeTotal": "223.03", "SizeTotalUnit": null, "SizeTotalText": null, "BedRooom": null, "BathRoom": null, "Storeys": null, "ParkingSpace": null, "Desc": "ห้องชุดเลขที่ 30/234-235 ห้อง G36 และ H37 ชั้นที่ 6 อาคารเลขที่ 1 บ้านกลางหัวหินคอนโด เนื้อที่ 40.28 ตร.ม. ตั้งอยู่บน ฉ.6338,68641 ตราจองเลขที่ 2987  งาน NPA & Resale Home 2016 ณ ศูนย์การประชุมแห่งชาติสิริกิติ์  ราคาพิเศษ  8,645,000.- บาท  รับจองซื้อภายในบูธกิจกรรม วันที่ 18-21 ส.ค. 59  ณ ศูนย์การประชุมแห่งชาติสิริกิติ์ เท่านั้น และวันที่ 22-31 ส.ค. 59 รับจองซื้อผ่านธนาคารออมสินทุกสาขาทั่วประเทศ", "SizeUtility": null, "Width": null, "WidthRoadFrontage": null, "Depth": null, "Age": null, "PropertyType": "ห้องชุด", "DocumentOfRightType": null, "DocumentOfRightDesc": null, "Promotion": null, "Remark": null, "RealEstateCondition": null, "Owner": null, "Project": null, "Timestamp": null, "ValidUntil": null, "Icon": null, "IsSoldOut": false, "Images": [], "Map": { "Lat": 0.0, "Lon": 0.0, "Images": [], "ParcelNumber": ["หนังสือกรรมสิทธิ์ห้องชุด", "30/234,หนังสือกรรมสิทธิ์ห้องชุด", "30/235"], "Desc": null, "Number": "30/234", "Village": null, "VillageNo": null, "Alley": null, "Lane": null, "Road": null, "SubDistrict": "หัวหิน", "District": "หัวหิน", "Province": "ประจวบคีรีขันธ์" }, "Contacts": [] }, { "Code": "BKK54105", "Source": "GSB", "Url": "http://properties.gsb.or.th/properties/prop_detail.php?page=home&ID=3522", "Name": null, "Price": 8500000.0, "SizeTotal": "57.00", "SizeTotalUnit": null, "SizeTotalText": null, "BedRooom": null, "BathRoom": null, "Storeys": null, "ParkingSpace": null, "Desc": "อาคารพาณิชย์ 3 ชั้น 2 คูหา มีชั้นลอยและดาดฟ้า ทะลุถึงกัน   งาน NPA & Resale Home 2016 ณ ศูนย์การประชุมแห่งชาติสิริกิติ์  ราคาพิเศษ  7,225,000.- บาท  รับจองซื้อภายในบูธกิจกรรม วันที่ 18-21 ส.ค. 59  ณ ศูนย์การประชุมแห่งชาติสิริกิติ์ เท่านั้น และวันที่ 22-31 ส.ค. 59 รับจองซื้อผ่านธนาคารออมสินทุกสาขาทั่วประเทศ", "SizeUtility": null, "Width": null, "WidthRoadFrontage": null, "Depth": null, "Age": null, "PropertyType": "อาคารพาณิชย์", "DocumentOfRightType": null, "DocumentOfRightDesc": null, "Promotion": null, "Remark": null, "RealEstateCondition": null, "Owner": null, "Project": null, "Timestamp": null, "ValidUntil": null, "Icon": null, "IsSoldOut": false, "Images": [], "Map": { "Lat": 0.0, "Lon": 0.0, "Images": [], "ParcelNumber": ["โฉนดที่ดิน", "24916,โฉนดที่ดิน", "8783"], "Desc": null, "Number": "88/158", "Village": null, "VillageNo": "7", "Alley": null, "Lane": null, "Road": null, "SubDistrict": "บางบอน", "District": "บางบอน", "Province": "กรุงเทพฯ" }, "Contacts": [] }, { "Code": "PKN570049", "Source": "GSB", "Url": "http://properties.gsb.or.th/properties/prop_detail.php?page=home&ID=7633", "Name": null, "Price": 6650000.0, "SizeTotal": "157.31", "SizeTotalUnit": null, "SizeTotalText": null, "BedRooom": null, "BathRoom": null, "Storeys": null, "ParkingSpace": null, "Desc": "ห้องชุดเลขที่ 30/294 ห้อง A1 ชั้นที่ 8 อาคารเลขที่ 1 บ้านกลางหัวหินคอนโด เนื้อที่ 157.31 ตร.ม. ตั้งอยู่บน ฉ.6338,68641 ตราจองเลขที่ 2987  งาน NPA & Resale Home 2016 ณ ศูนย์การประชุมแห่งชาติสิริกิติ์  ราคาพิเศษ  6,318,000.- บาท  รับจองซื้อภายในบูธกิจกรรม วันที่ 18-21 ส.ค. 59  ณ ศูนย์การประชุมแห่งชาติสิริกิติ์ เท่านั้น และวันที่ 22-31 ส.ค. 59 รับจองซื้อผ่านธนาคารออมสินทุกสาขาทั่วประเทศ", "SizeUtility": null, "Width": null, "WidthRoadFrontage": null, "Depth": null, "Age": null, "PropertyType": "ห้องชุด", "DocumentOfRightType": null, "DocumentOfRightDesc": null, "Promotion": null, "Remark": null, "RealEstateCondition": null, "Owner": null, "Project": null, "Timestamp": null, "ValidUntil": null, "Icon": null, "IsSoldOut": false, "Images": [], "Map": { "Lat": 0.0, "Lon": 0.0, "Images": [], "ParcelNumber": ["หนังสือกรรมสิทธิ์ห้องชุด", "30/294"], "Desc": null, "Number": "30/294", "Village": null, "VillageNo": null, "Alley": null, "Lane": null, "Road": null, "SubDistrict": "หัวหิน", "District": "หัวหิน", "Province": "ประจวบคีรีขันธ์" }, "Contacts": [] }, { "Code": "PKN570005", "Source": "GSB", "Url": "http://properties.gsb.or.th/properties/prop_detail.php?page=home&ID=7580", "Name": null, "Price": 6300000.0, "SizeTotal": "157.31", "SizeTotalUnit": null, "SizeTotalText": null, "BedRooom": null, "BathRoom": null, "Storeys": null, "ParkingSpace": null, "Desc": "ห้องชุดเลขที่ 30/153 ห้อง A1 ชั้นที่ 5 อาคารเลขที่ 1 บ้านกลางหัวหินคอนโด เนื้อที่ 157.31 ตร.ม. ตั้งอยู่บน ฉ.6338,68641 ตราจองเลขที่ 2987  งาน NPA & Resale Home 2016 ณ ศูนย์การประชุมแห่งชาติสิริกิติ์  ราคาพิเศษ  5,985,000.- บาท  รับจองซื้อภายในบูธกิจกรรม วันที่ 18-21 ส.ค. 59  ณ ศูนย์การประชุมแห่งชาติสิริกิติ์ เท่านั้น และวันที่ 22-31 ส.ค. 59 รับจองซื้อผ่านธนาคารออมสินทุกสาขาทั่วประเทศ", "SizeUtility": null, "Width": null, "WidthRoadFrontage": null, "Depth": null, "Age": null, "PropertyType": "ห้องชุด", "DocumentOfRightType": null, "DocumentOfRightDesc": null, "Promotion": null, "Remark": null, "RealEstateCondition": null, "Owner": null, "Project": null, "Timestamp": null, "ValidUntil": null, "Icon": null, "IsSoldOut": false, "Images": [], "Map": { "Lat": 0.0, "Lon": 0.0, "Images": [], "ParcelNumber": ["หนังสือกรรมสิทธิ์ห้องชุด", "30/153"], "Desc": null, "Number": "30/153", "Village": null, "VillageNo": null, "Alley": null, "Lane": null, "Road": null, "SubDistrict": "หัวหิน", "District": "หัวหิน", "Province": "ประจวบคีรีขันธ์" }, "Contacts": [] }, { "Code": "KBI560004", "Source": "GSB", "Url": "http://properties.gsb.or.th/properties/prop_detail.php?page=home&ID=5731", "Name": null, "Price": 6000000.0, "SizeTotal": "28.00", "SizeTotalUnit": null, "SizeTotalText": null, "BedRooom": null, "BathRoom": null, "Storeys": null, "ParkingSpace": null, "Desc": "อาคารพาณิชย์ 3 ชั้น 1 คูหา(ห้องริม) ดาดฟ้า 4 ห้องนอน 5 ห้องน้ำ 1 ห้องครัว  งาน NPA & Resale Home 2016 ณ ศูนย์การประชุมแห่งชาติสิริกิติ์  ราคาพิเศษ  5,100,000.- บาท  รับจองซื้อภายในบูธกิจกรรม วันที่ 18-21 ส.ค. 59  ณ ศูนย์การประชุมแห่งชาติสิริกิติ์ เท่านั้น และวันที่ 22-31 ส.ค. 59 รับจองซื้อผ่านธนาคารออมสินทุกสาขาทั่วประเทศ", "SizeUtility": null, "Width": null, "WidthRoadFrontage": null, "Depth": null, "Age": null, "PropertyType": "อาคารพาณิชย์", "DocumentOfRightType": null, "DocumentOfRightDesc": null, "Promotion": null, "Remark": null, "RealEstateCondition": null, "Owner": null, "Project": null, "Timestamp": null, "ValidUntil": null, "Icon": null, "IsSoldOut": false, "Images": [], "Map": { "Lat": 0.0, "Lon": 0.0, "Images": [], "ParcelNumber": ["น.ส.3", "ก.", "2553"], "Desc": null, "Number": "113/16", "Village": null, "VillageNo": "8", "Alley": null, "Lane": null, "Road": null, "SubDistrict": "เกาะลันตาใหญ่", "District": "เกาะลันตา", "Province": "กระบี่" }, "Contacts": [] }, { "Code": "CBR560002", "Source": "GSB", "Url": "http://properties.gsb.or.th/properties/prop_detail.php?page=home&ID=4899", "Name": null, "Price": 5500000.0, "SizeTotal": "124.00", "SizeTotalUnit": null, "SizeTotalText": null, "BedRooom": null, "BathRoom": null, "Storeys": null, "ParkingSpace": null, "Desc": "บ้านเดี่ยว 1 ชั้น (เล่นระดับ) 3 ห้องนอน 3 ห้องน้ำ 1 ห้องครัว  งาน NPA & Resale Home 2016 ณ ศูนย์การประชุมแห่งชาติสิริกิติ์  ราคาพิเศษ  4,675,000.- บาท  รับจองซื้อภายในบูธกิจกรรม วันที่ 18-21 ส.ค. 59  ณ ศูนย์การประชุมแห่งชาติสิริกิติ์ เท่านั้น และวันที่ 22-31 ส.ค. 59 รับจองซื้อผ่านธนาคารออมสินทุกสาขาทั่วประเทศ", "SizeUtility": null, "Width": null, "WidthRoadFrontage": null, "Depth": null, "Age": null, "PropertyType": "บ้านเดี่ยว", "DocumentOfRightType": null, "DocumentOfRightDesc": null, "Promotion": null, "Remark": null, "RealEstateCondition": null, "Owner": null, "Project": null, "Timestamp": null, "ValidUntil": null, "Icon": null, "IsSoldOut": false, "Images": ["/upload/properties/CBR560002/1366254330-1.JPG", "/upload/properties/CBR560002/1366254330-9.JPG", "/upload/properties/CBR560002/1366254331-10.JPG", "/upload/properties/CBR560002/1366254331-13.JPG"], "Map": { "Lat": 0.0, "Lon": 0.0, "Images": ["/upload/properties/CBR560002/1366254331-15.JPG", "/upload/properties/CBR560002/1366254331-16.JPG", "/upload/properties/CBR560002/1366254331-14.JPG"], "ParcelNumber": ["โฉนดที่ดิน", "157832"], "Desc": null, "Number": "15/5", "Village": null, "VillageNo": "3", "Alley": null, "Lane": null, "Road": null, "SubDistrict": "หนองปลาไหล", "District": "บางละมุง", "Province": "ชลบุรี" }, "Contacts": [] }, { "Code": "PKN570046", "Source": "GSB", "Url": "http://properties.gsb.or.th/properties/prop_detail.php?page=home&ID=7619", "Name": null, "Price": 5420000.0, "SizeTotal": "130.76", "SizeTotalUnit": null, "SizeTotalText": null, "BedRooom": null, "BathRoom": null, "Storeys": null, "ParkingSpace": null, "Desc": "ห้องชุดเลขที่ 30/283 ห้อง I38 (ไอ38) ชั้นที่ 7 อาคารเลขที่ 1 บ้านกลางหัวหินคอนโด เนื้อที่ 130.76 ตร.ม. ตั้งอยู่บน ฉ.6338,68641 ตราจองเลขที่ 2987  งาน NPA & Resale Home 2016 ณ ศูนย์การประชุมแห่งชาติสิริกิติ์  ราคาพิเศษ  5,149,000.- บาท  รับจองซื้อภายในบูธกิจกรรม วันที่ 18-21 ส.ค. 59  ณ ศูนย์การประชุมแห่งชาติสิริกิติ์ เท่านั้น และวันที่ 22-31 ส.ค. 59 รับจองซื้อผ่านธนาคารออมสินทุกสาขาทั่วประเทศ", "SizeUtility": null, "Width": null, "WidthRoadFrontage": null, "Depth": null, "Age": null, "PropertyType": "ห้องชุด", "DocumentOfRightType": null, "DocumentOfRightDesc": null, "Promotion": null, "Remark": null, "RealEstateCondition": null, "Owner": null, "Project": null, "Timestamp": null, "ValidUntil": null, "Icon": null, "IsSoldOut": false, "Images": [], "Map": { "Lat": 0.0, "Lon": 0.0, "Images": [], "ParcelNumber": ["หนังสือกรรมสิทธิ์ห้องชุด", "30/283"], "Desc": null, "Number": "30/283", "Village": null, "VillageNo": null, "Alley": null, "Lane": null, "Road": null, "SubDistrict": "หัวหิน", "District": "หัวหิน", "Province": "ประจวบคีรีขันธ์" }, "Contacts": [] }, { "Code": "PKN570019", "Source": "GSB", "Url": "http://properties.gsb.or.th/properties/prop_detail.php?page=home&ID=7594", "Name": null, "Price": 5240000.0, "SizeTotal": "130.76", "SizeTotalUnit": null, "SizeTotalText": null, "BedRooom": null, "BathRoom": null, "Storeys": null, "ParkingSpace": null, "Desc": "ห้องชุดเลขที่ 30/189 ห้อง I38 (ไอสามแปด) ชั้นที่ 5 อาคารเลขที่ 1 บ้านกลางหัวหินคอนโด เนื้อที่ 130.76 ตร.ม. ตั้งอยู่บน ฉ.6338,68641 ตราจองเลขที่ 2987  งาน NPA & Resale Home 2016 ณ ศูนย์การประชุมแห่งชาติสิริกิติ์  ราคาพิเศษ  4,978,000.- บาท  รับจองซื้อภายในบูธกิจกรรม วันที่ 18-21 ส.ค. 59  ณ ศูนย์การประชุมแห่งชาติสิริกิติ์ เท่านั้น และวันที่ 22-31 ส.ค. 59 รับจองซื้อผ่านธนาคารออมสินทุกสาขาทั่วประเทศ", "SizeUtility": null, "Width": null, "WidthRoadFrontage": null, "Depth": null, "Age": null, "PropertyType": "ห้องชุด", "DocumentOfRightType": null, "DocumentOfRightDesc": null, "Promotion": null, "Remark": null, "RealEstateCondition": null, "Owner": null, "Project": null, "Timestamp": null, "ValidUntil": null, "Icon": null, "IsSoldOut": false, "Images": [], "Map": { "Lat": 0.0, "Lon": 0.0, "Images": [], "ParcelNumber": ["หนังสือกรรมสิทธิ์ห้องชุด", "30/189"], "Desc": null, "Number": "30/189", "Village": null, "VillageNo": null, "Alley": null, "Lane": null, "Road": null, "SubDistrict": "หัวหิน", "District": "หัวหิน", "Province": "ประจวบคีรีขันธ์" }, "Contacts": [] }];

ReactDOM.render(
    <SearchBox url="/realestates/getall" submitUrl="/realestates/query" pollInterval={2000 } />,
    document.getElementById('root')
);