function $(id) {
  return document.getElementById(id);
}

Number.prototype.twoDigits = function () {
  return this < 10 ? "0" + this : "" + this;
};

function dateToStr(d) {
  // aaaammjj avec un vrai mois pour le PHP !
  return (
    d.getFullYear() + (d.getMonth() + 1).twoDigits() + d.getDate().twoDigits()
  );
}

(function () {
  var jrs = "dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi".split(",");
  var mos = "janvier,février,mars,avril,mai,juin,juillet,août,septembre,octobre,novembre,décembre".split(",");
  var crrDay = new Date(), crrMon, newMon;
      crrDay.setHours(12, 0, 0, 0);
      crrMon = new Date(crrDay);
      while (crrMon.getDay() != 1)crrMon.setDate(crrMon.getDate() - 1);
      newMon = new Date(crrMon); //alert("ok "+crrDay.toLocaleString())

  return (displayWeek = function (w) {
    var j,k,l,c,d,crr,doc,nds,lnk = (lnl = "");
    crr = new Date(newMon);
    crr.setDate(crr.getDate() + (typeof w == "undefined" ? 0 : 7 * w));
    newMon = new Date(crr);
    $("main").innerHTML = ""; // alert("ok "+crr.toLocaleString())
    // Semaine
    while (crr.getDay()) {
      d = crr.getDay();
      if (d < 6) { 
        c = l = "";
          if (d == 5) c = ' class="der"';
            if (crr.valueOf() == crrDay.valueOf()) l = ' class="crr"';
              obj = document.createElement("div");
              obj.id = "day" + crr.getDay();
              obj.className = "day";
              j = jrs[crr.getDay()] + " " + crr.getDate();
              k = dateToStr(crr);

              obj.innerHTML ="<h2" + c + "><b>" + lnk + j + lnl + "</b><br>" + mos[crr.getMonth()] + " " + crr.getFullYear() + '</h2><hr><div id="cnt"' + crr.getDay() + '">&nbsp;</div>';
              $("main").appendChild(obj);
        }
      crr.setDate(crr.getDate() + 1);
    }
    // Récupération des taches dans la semaine
    // sndRqt(
    //   "z_chr-txt-get-week.php?cls=<?php echo $cls ?>&wkm=" + dateToStr(newMon),
    //   function (r) {
    //     var s = r.responseText.split("|");
    //     for (i = 0; i < 7; i++) {
    //       j = (i + 1) % 7;
    //       if ($("cnt" + j))
    //         $("cnt" + j).innerHTML = s[i] ? s[i] : "<p>&nbsp;</p>";
    //     }
      // }
    // );
  });
})();
displayWeek();
