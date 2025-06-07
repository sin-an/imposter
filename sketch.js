// Define the global variables: input, button, and greeting.
let playerInput;
let button;
let greeting;
let players = new Array();
let playerButtons = new Array()
let germanWords = [
  "Selfie", "Döner", "Bierpong", "Netflix", "WhatsApp", "Sneaker", "Hoodie", "Tattoo", "Bagger", "Festival",
  "Meme", "Emoji", "Kaffeemaschine", "Chips", "Liegestuhl", "Kaktus", "Unicorn", "Zombie", "Pantomime", "Yoga",
  "Trampolin", "Powerbank", "Sonnenbrille", "Grillparty", "DJ", "Bouncer", "Kopfhörer", "Cocktail", "Bananenbrot", "TikTok",
  "Gönn dir", "Gamer", "Screenshot", "Eiscreme", "Lasagne", "Karaoke", "Sushi", "Tatort", "Buchclub", "Kneipe",
  "Zoom", "Balkonien", "Sneakerhead", "Instagram", "Filterkaffee", "Aperol", "Jogginghose", "Serienmarathon", "Kuscheldecke", "Tinder",
  "Ghosten", "Couch", "Binge", "Streetfood", "Glitzer", "WLAN", "Festivalbändchen", "Kaugummi", "Slush", "Kopfkino",
  "Haargummi", "Plastikbesteck", "Kellerkind", "Snackautomat", "Fritteuse", "Badeente", "Kaktus", "Helium", "Marshmallow", "Kartoffel",
  "Frisbee", "Wasserpistole", "Einrad", "Lippenstift", "Brezel", "Flipflops", "Hängematte", "Pizzakarton", "Büroklammer", "Riesenrad",
  "Luftmatratze", "Flamingo", "Festivalzelt", "Kichererbse", "Sockenmonster", "Schokokeks", "Popcorn", "Badehose", "Schlafsack", "Gummibärchen",
  "Staubsauger", "Cornflakes", "Schnitzel", "Klobürste", "Lippenbalsam", "Bobbycar", "Lieblingslied", "Pizzaschneider", "Duschgel", "Kekskrümel",
  "Ventilator", "Funkgerät", "Roller", "Seifenblase", "Wackelpudding", "Beamer", "USB-Stick", "Gartenzwerg", "Wasserkocher", "Papiertüte",
  "Spaghetti", "Autokino", "Einkaufswagen", "Feuerzeug", "Kissen", "Nagellack", "Klobrille", "Socken", "Currywurst", "Erdnussbutter",
  "Rollschuhe", "Wäscheleine", "Käsebrot", "Pflanze", "Weinglas", "Föhn", "Schlittschuh", "Eiswürfel", "Pfandflasche", "Toaster",
  "Sonnencreme", "Haarspray", "Schneekugel", "Schlüsselanhänger", "Smartwatch", "Lichterkette", "Zahnbürste", "Handyladekabel", "Pfannkuchen", "Spiegelschrank",
  "Mikrowelle", "Schlafbrille", "Joghurt", "Bürostuhl", "Mülleimer", "Espressokocher", "Waschbär", "Hafermilch", "Besen", "Milchshake",
  "Lichterkette", "Tacker", "Hula-Hoop", "Reis", "Fidget Spinner", "Gitarre", "Muskelkater", "Trinkflasche", "Schlafanzug", "Jogurtbecher",
  "Katzenvideo", "Luftballon", "Fruchtgummi", "Badeanzug", "Hula-Hoop", "Kugelschreiber", "Zahnseide", "Autotür", "Schreibblock", "Nagelschere",
  "Waschmaschine", "Backofen", "Grashalm", "Flaschenöffner", "Hausschuh", "Sandburg", "Postkarte", "Kronkorken", "Laterne", "Wischmopp",
  "Keksdose", "Buchstabe", "Hängeschrank", "Duschvorhang", "Knallfrosch", "Strohhalm", "Klebeband", "Tischtennis", "Sonnenuntergang", "Espresso",
  "Mülleimer", "Fernbedienung", "Kaffeetasse", "Handcreme", "Fahrradklingel", "Eierschneider", "Ketchup", "Waschlappen", "Gemüsespieß", "Besenstiel",
  "Korkenzieher", "Topflappen", "Heizdecke", "Zitronenpresse", "Kartenspiel", "Flaschengeist", "Kreide", "Pinsel", "Sektglas", "Tupperdose"
];
let word;
let displayText = "";
let showText = true;

function setup() {
  createCanvas(710, 400);
  background(255);

  // Use the greeting variable to ask for the person's name.
  greeting = createElement('h2', 'How many players?');
  greeting.position(20, 5);

  // Create the input and button in the canvas.
  playerInput = createInput();
  playerInput.position(20, 55);

  button = createButton('submit');
  button.position(playerInput.x + playerInput.width, 55);
  
  wordListText = createElement("h2", "Words to add")
  wordListText.position(20, 100)
  
  wordListInput = createInput("Apfel, Birne, Katze")
  wordListInput.position(20, 150)
  
  wordListButton1 = createButton("append")
  wordListButton1.position(wordListInput.x + wordListInput.width, 150)
  
  wordListButton2 = createButton("overwrite")
  wordListButton2.position(wordListInput.x + wordListInput.width + wordListButton1.width, 150)

  button.mousePressed(game);
  wordListButton1.mousePressed(() => appendList(wordListInput.value()))
  wordListButton2.mousePressed(() => overwrite(wordListInput.value()))
  
  
  playerInput.changed(game);
}

function draw(){
  background(255)
  if (showText) {
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text(displayText, width / 2, height / 2);
  }
}

function game() {
  
  word = random(germanWords)
  background(100,100,100);
  greeting.remove()
  playerInput.remove()
  button.remove()
  wordListText.remove()
  wordListInput.remove()
  wordListButton1.remove()
  wordListButton2.remove()
  
  console.log(germanWords, word)
  
  let playerCount = playerInput.value();
  
  
  for (let i = 0; i < playerCount; i++){
    players.push(0)
    let button = createButton(String(i+1))
    button.mousePressed(() => handleButtonPress(i));
    playerButtons.push(button)
  }
  let imposter = floor(random()*playerCount)
  players[imposter] = 1;

  
  for(let i = 0; i < players.length; i++){
    playerButtons[i].position(10+i*40,10, 30)
  }
}

function appendList(i){
  germanWords = germanWords.concat(i.split(", "))
}

function overwrite(i){
  germanWords = i.split(", ")
}
function handleButtonPress(i){
  console.log(players[i], word)
  if (players[i] == 0) {
    displayText = word;
  } else {
    console.log("here")
    displayText = "Imposter!";
  }
  showText = true;

  // Show for 2 seconds, then clear and resume draw loop
  setTimeout(() => {
    showText = false;
    redraw();
  }, 2000);
  
}