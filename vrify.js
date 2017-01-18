/* 
 * alternatives
 *
 * https://github.com/kfarr/jurassic-file-navigator
 * https://github.com/jhspetersson/filemanager-vr
 *
 */

// removing existing CSS
var elements = document.querySelectorAll('link[rel=stylesheet]');
for(var i=0;i<elements.length;i++){
	    elements[i].parentNode.removeChild(elements[i]);
}

let x = document.body.querySelectorAll('body > *');
let index = 0;
for( index=0; index < x.length; index++ ) {
	x[index].style.display = "none";
	//console.log(x[index], 'removed');
}

// adding aframe and components
scripts = [
	"https://aframe.io/releases/0.4.0/aframe.min.js",
	"https://rawgit.com/bryik/aframe-bmfont-text-component/master/dist/aframe-bmfont-text-component.min.js",
	"https://321c4.github.io/aframe-link-demo/js/aframe-hyperlink.js",
];
index = 0;
for( index=0; index < scripts.length; index++ ) {
	script = document.createElement("script");
	script.setAttribute("src", scripts[index]);
	document.head.appendChild(script);
}

// making a scene
scene = document.createElement("a-scene");
scene.setAttribute("debug", "");
document.body.appendChild(scene);

// adding a sky, easier to debug
sky = document.createElement("a-sky");
sky.setAttribute("color", "lightblue");
scene.appendChild(sky);

function addCamera(){
	camera = document.createElement("a-camera");
	camera.setAttribute("id", "camera");
	camera.setAttribute("look-controls", "");
	camera.setAttribute("wasd-controls", "");
	scene.appendChild(camera);

	ring = document.createElement("a-ring");
	ring.setAttribute("radius-outer", "0.03");
	ring.setAttribute("radius-inner", "0.02");
	ring.setAttribute("cursor", "maxDistance: 30; fuse: true;");
	camera.appendChild(ring);
}

// adding files, probably browser specific but for now focusing on Nightly for link traversal
function addFiles(){
	files = document.createElement("a-entity");
	files.setAttribute("position", "0 0 0");
	files.setAttribute("layout", "type:cube");
	files.setAttribute("id", "files");
	scene.appendChild(files);

	x = document.body.querySelectorAll('[class=file]');
	index = 0;
	for( index=0; index < x.length; index++ ) {
		box = document.createElement("a-box");
		box.setAttribute("color", "white");
		box.setAttribute("depth", "0.3");
		box.setAttribute("position", ""+index*1.1+" 1 -5");
		files.appendChild(box);
		filename = x[index].href.replace(window.location,"");
		text = document.createElement("a-entity");
		text.setAttribute("bmfont-text", "text: "+filename);
		if (index%2==0)
			text.setAttribute("position", "-0.5 0.7 0.5");
		else
			text.setAttribute("position", "-0.5 1 0.5");
		box.appendChild(text);
	}
}

function addParentFolder(){
	filename = (window.location+"..");
	box = document.createElement("a-box");
	box.setAttribute("color", "orange");
	box.setAttribute("href", filename );
	box.setAttribute("position", "0 4 -5");
	text = document.createElement("a-entity");
	text.setAttribute("bmfont-text", "text: "+filename);
	text.setAttribute("position", "-0.5 0.5 0.5");
	box.appendChild(text);
	scene.appendChild(box);

}

function addFolders(){
	folders = document.createElement("a-entity");
	folders.setAttribute("position", "0 0.8 0");
	folders.setAttribute("layout", "type:cube");
	folders.setAttribute("id", "folders");
	scene.appendChild(folders);

	x = document.body.querySelectorAll('[class=dir]');
	index = 0;
	for( index=0; index < x.length; index++ ) {
		box = document.createElement("a-box");
		box.setAttribute("color", "brown");
		box.setAttribute("href", x[index].href );
		box.setAttribute("position", ""+index*1.1+" -1 -5");
		folders.appendChild(box);
		filename = x[index].href.replace(window.location,"");
		text = document.createElement("a-entity");
		text.setAttribute("bmfont-text", "text: "+filename);
		if (index%2==0)
			text.setAttribute("position", "-0.5 -0.7 0.5");
		else
			text.setAttribute("position", "-0.5 -1 0.5");
		box.appendChild(text);
	}
}

/*
 * trying to add the script later i.e. after the scene has loaded but still unable to register
 */
function lateScripts(){
	latescripts = [
		"https://rawgit.com/ngokevin/kframe/master/components/layout/dist/aframe-layout-component.min.js",
	];
	index = 0;
	for( index=0; index < latescripts.length; index++ ) {
		script = document.createElement("script");
		script.setAttribute("src", latescripts[index]);
		document.head.appendChild(script);
	}
	// somehow doesn't work
}

if (scene.hasLoaded) {
	run();
} else {
	scene.addEventListener('loaded', run);
}

function run () {
	addCamera();
	addFiles();
	addFolders();
	addParentFolder();
}
