# Sample Application of AwesomeMapMarker 

<img width="75%" alt="icon" src="https://user-images.githubusercontent.com/2704723/52534335-b0b30a00-2d83-11e9-824b-6167064dc033.png">

This is a sample application that uses [AwesomeMapMarker](https://github.com/kazuomatz/AwesomeMapMarker). 
AwesomeMapMarker is a library that generates markers from Fontawesome 5 for plotting on maps such as Google Map, Open Street Map and iOS App etc.

## Ruby version

- 2.51

## System dependencies

- Rails 5.2.2
- Vue.js 2.5.2
- webpack 4.29.0 (not use webpacker)
- [Buefy](https://buefy.github.io/)

## How to run

```bash
$ bundle install
$ npm install
$ touch .env
$ vim .env
```

```text
MAP_API_KEY='--YOUR API KEY---'
```

Set your Google Map API key in the .env file.

```bash
$ foreman start
```
Access http://localhost:5000 in the browser.

If you have not installed foreman, install it as follows.

```bash
$ gem install foreman
```

If you want to change the latitude and longitude when displaying the map, change the default position in frontend/views/top/ index.html.erb

```html
<script>
    var apiKey = "<%=ENV['MAP_API_KEY']%>";
    var defultPostion = {lat: 34.972187, lng: 138.388901};
</script>
```


## License

- This applocation is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
- All font files licensed under [SIL OFL 1.1](http://scripts.sil.org/OFL).
