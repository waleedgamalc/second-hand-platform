import { Component, ViewChild , inject} from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { addDoc , collection } from 'firebase/firestore';
import { AngularFireStorage} from '@angular/fire/compat/storage'
import { LoginComponent } from '../login/login.component';
import { UsernameService } from '../username.service';


@Component({
  selector: 'app-sellitemform',
  templateUrl: './sellitemform.component.html',
  styleUrl: './sellitemform.component.css'
})
export class SellitemformComponent {

  
  constructor (private FirebaseService : FirebaseService  , private FireStorage : AngularFireStorage , private userService: UsernameService) {}
  
  @ViewChild ("createProductForm") productForm : any;

  resetForm (): void{
    this.productForm.reset({

      'photo' : '',
      'name' : '',
      'description' :'',
      'price' : ''

    })
  }

uploadedPhotoUrl: string = '';

async onFileChange (event : any){
  const file = event.target.files[0];
  if (file) {
    const path = `yt/${file.name}`
    const uploadPhoto = await this.FireStorage.upload(path,file)
    this.uploadedPhotoUrl =  await uploadPhoto.ref.getDownloadURL();
    console.log(this.uploadedPhotoUrl)
  }
}

firestore : Firestore = inject(Firestore);
saveData (): void {
  const username = this.userService.username;
  const acollection = collection(this.firestore , 'product')
  addDoc (acollection,{
    'photo' : this.uploadedPhotoUrl,
    'name' : this.productForm.value.name,
    'description' : this.productForm.value.description,
    'price' : this.productForm.value.price,
    'state' : 'Available',
    'username' : username
  })
}

submitForm () : void{
  if (this.productForm.form.valid) {
    this.saveData();
    this.resetForm();
    alert(this.productForm.value.name)
   
    }
    else {
      alert("Form is invalid");
    }
  }

}
