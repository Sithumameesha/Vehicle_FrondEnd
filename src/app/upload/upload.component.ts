import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface VehicleDetail {
  vehicle_name: string;
  confidence: number;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | undefined;
  uploadedImage: string | undefined;
  vehicleDetails: VehicleDetail | undefined;

  constructor(private http: HttpClient) {}

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<VehicleDetail>('http://127.0.0.1:8000/uploadFile/', formData)
        .subscribe(response => {
          // @ts-ignore
          console.log(response.filename);
          // @ts-ignore
          this.vehicleDetails = response;
        });
    }
  }
}
