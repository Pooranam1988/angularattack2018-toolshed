import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ListingsService} from "../listings.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  url
  form
  img
  filename

  constructor(private fb: FormBuilder, private listingService: ListingsService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: '',
      description: '',
      img: '',
    });
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      this.filename = event.target.files[0].name
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = (<any>event.target).result;
        this.img = reader.result.split(',')[1]
      }

    }
  }

  onSubmit(form) {
    const body = Object.assign(form.value, {img: this.img, filename: this.filename})
    console.log(body)

    this.listingService.createListing(body).subscribe(() => {
      window.alert("Oh yeah!")
    })
  }
}
