<?php
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
  // On reçoit les données brutes du post.
  $content = trim(file_get_contents("php://input"));
  
  // On utilise la notation fléchée pour l'accès aux données décodées du string json 
  // Si on utilise $decoded = json_decode($content,true); l'accès se fait par index de tableau array["ttt"]  
  $decoded = json_decode($content);  
  echo $decoded->myObj->clef;
  // On génère la date et l'heure
  $date = date('d/m/Y');
  setlocale(LC_TIME, 'fr_FR');
  date_default_timezone_set("Europe/Paris");
  $currentDate = utf8_encode($date);
  $currentTime = utf8_encode(strftime('%H:%M'));


  // Il faut créer le répertoire sur le serveur s'il n'existe pas
  // On récupère les 3 premières lettres du userId pour créer l'arboresscence
  $lettre1 = $decoded->myObj->userId[0];
  $lettre2 = $decoded->myObj->userId[1];
  $lettre3 = $decoded->myObj->userId[2];
  $path = './resultats/'.$lettre1.'/'.$lettre2.'/'.$lettre3;
  // On génère une nouvelle clef uniquement si l'arborescence n'existe pas
  // Sinon on récupère la clef dans le nom du fichier on verra plus tard s'il y a plusieurs fichiers
  if (!file_exists($path)) {
    mkdir($path, 0775, true);
    //$keypass = strval($decoded->myObj->clef); // On peut ajouter un test pour savoir si c'est déjà un stirng
    $keypass = md5(uniqid(rand(), true));
  } else {    
    $keypass = substr(scandir($path)[2],0,-10);
  };

  // Il faut créer le fichier de stockage s'il n'existe pas à partir de la clef  
  $pathToFile = $path.'/'.$keypass.'scores.csv';  
  // On ouvre le fichier
  $fp = fopen($pathToFile, 'a+');      
  // S'il n'existe pas on crée l'entete et on ajoute les données
  if (strlen(file_get_contents($pathToFile))==0) {
    fputs($fp, "idUser,idExo,nbBonnesReponse,nbQuestions,date,heure \r\n");  
  };
  fputs($fp, $decoded->myObj->userId.','.$decoded->myObj->refEx.','.$decoded->myObj->nbBonnesReponses.','.$decoded->myObj->nbQuestions.','.$currentDate.','.$currentTime."\r\n");  
  fclose($fp);
  // Si json_decode échoue, le JSON est invalide.
  if(! is_array($decoded)) {

  } else {
    // On peut envoyer un message d'erreur à l'utilisateur
  }
}
?>