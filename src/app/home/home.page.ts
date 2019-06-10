import { Component } from '@angular/core';
import { ToastController ,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  alimentos = [
    {nombre:'carne' ,medida:'gramos', proteinas:'245', calorias :'150' , id :1 },
    {nombre:'pollo'  ,medida:'gramos', proteinas:'3562', calorias :'170' , id :2 },
    {nombre:'arroz'  ,medida:'gramos', proteinas:'352', calorias :'1530', id :3 },
    {nombre:'papas' ,medida:'gramos' , proteinas:'34', calorias :'1564', id :4 },
    {nombre:'cosas' ,medida:'gramos' , proteinas:'564', calorias :'120', id :5 },
    {nombre:'platano' ,medida:'gramos' , proteinas:'62', calorias :'1540', id :6 },
    {nombre:'bebida'  ,medida:'ml', proteinas:'613', calorias :'1360', id :7 },
    {nombre:'humita'  ,medida:'gramos' , proteinas:'34', calorias :'470', id :6 },
    {nombre:'chaparrita' ,medida:'gramos' , proteinas:'23', calorias :'740', id :7 },
    {nombre:'empanada' ,medida:'gramos' ,medida:'gramos' , proteinas:'63', calorias :'340', id :8 },
    {nombre:'blabla'  ,medida:'gramos', proteinas:'24', calorias :'1120', id :9 },
  ]
  alimentoSeleccionado : any;
  calorias : number = 0;
  proteinas : number = 0;
  items = [
    {nombre:'desayuno',id:1},
    {nombre:'almuerzo',id:2},
    {nombre:'once',id:3},
  ];
  comidas = [
    {nombre:'pollo frito', item : 1 , id:11},
    {nombre:'arroz con papas fritas' , item:2 , id:22},
    {nombre:'otra cosa con papas fritas' , item:3 , id:23},
    {nombre:'kethup', item:3 , id :33},
  ]
  lista = [
      {nombre:'pollo'  ,medida:'gramos', proteinas:'3562', calorias :'170' , id : 11 },
      {nombre:'aceite'  ,medida:'ml', proteinas:'125', calorias :'62' , id : 11 },
      {nombre:'arroz' ,medida:'gramos' ,medida:'gramos' , proteinas:'193', calorias :'340', id :22 },
      {nombre:'papas' ,medida:'gramos' ,medida:'gramos' , proteinas:'635', calorias :'340', id :22 },
      {nombre:'cosa' ,medida:'gramos' ,medida:'gramos' , proteinas:'635', calorias :'340', id :23 },
      {nombre:'aceite'  ,medida:'ml', proteinas:'162', calorias :'62' , id : 23 },
      {nombre:'aceite'  ,medida:'ml', proteinas:'162', calorias :'62' , id : 22 },
      {nombre:'ketchuppp'  ,medida:'ml', proteinas:'125', calorias :'62' , id : 33 },
  ];
  //lista = [];
  constructor(public alertController: AlertController,public toastController: ToastController) {}

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
     message: mensaje,
     position: 'bottom',
     duration: 2000,
     buttons: [
       {
         text: 'Listo!',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

    toast.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Añadir Comentario!',
      inputs: [
        {
          name: 'comentario',
          type: 'text',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast("Cancelado!");
          }
        }, {
          text: 'Guardar',
          handler: () => {
            this.presentToast("Mensaje guardado correctamente");
          }
        }
      ]
    });

    await alert.present();
  }

  resetValues(){
    this.calorias = 0;
    this.proteinas = 0;
  }
  maping(){
    this.resetValues();
    this.lista.map( x => this.sumValues(x));
  }
  sumValues(item){
    this.calorias = parseInt(item.calorias) + parseInt(this.calorias);
    this.proteinas = parseInt(item.proteinas) + parseInt(this.proteinas);
  }
  removeItem(item){
    let newLista = this.lista.filter( x => this.filtroParaRemover(x,item) );
    this.lista = newLista;
    this.maping();
  }

  addItem(){
    //console.log(this.alimentos.filter( x => x.id === this.alimentoSeleccionado ));
    this.calorias = 0 ;
    let item = this.alimentos.filter( x => this.filtros(x,this.alimentoSeleccionado) );

    if(item.length>0){
      this.lista.push(item[0]);
    }
    this.maping();

  }
  filtros(item,alimentoSeleccionado){
    if(item.id==this.alimentoSeleccionado){
      return true;
    }else{
      return false;
    }
  }

  filtroParaRemover(itemActual, itemRemover ){
    if(itemActual==itemRemover){
      return false;
    }else{
      return true;
    }
  }

}
