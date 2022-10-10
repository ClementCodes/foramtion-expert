import { Directive, ElementRef, Host, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: "[highLight]"
})


// on peut aussi mettre la directive dans lae parmatre de meme couleur voir video https://openclassrooms.com/fr/courses/7471281-perfectionnez-vous-sur-angular/7717991-creez-votre-propre-directive  , 
//Une Directive peut être placée sur différents types d'élément HTML pour leur apporter un comportement supplémentaire.

// Le selector d'une Directive attribut doit s'écrire entre crochets  []  .

// Une Directive peut injecter l'élément HTML sur lequel elle est placée avec  ElementRef  , et interagir avec cet élément avec  Renderer2  .

// Une Directive peut comporter des  @Input  pour accepter des paramètres.

// Une Directive peut écouter les événements émanant de son élément grâce au décorateur  @HostListener  
export class highLightDirective {

    @Input() color = "yellow"

    ngAfterViewInit(): void {
        this.setBackroundColor(this.color)

    }

    constructor(private el: ElementRef, private renderer: Renderer2) { }


    setBackroundColor(color: string) {
        this.renderer.setStyle(this.el.nativeElement, 'background-color', color)
    }
    //Dans hostlistener mousenter n'est pas ecrit en title case car c'est la focntion du hostlistener par défaut qui est decrite de la sorte
    @HostListener("mouseenter") onMouseEnter() {
        this.setBackroundColor("blue")
    }

    @HostListener("mouseleave") onMouseLeave() {
        this.setBackroundColor(this.color)
    }





}


