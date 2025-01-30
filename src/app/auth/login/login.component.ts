import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/authService/auth.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
        });
      }

      onSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
          
            this.authService.login(this.loginForm.value).subscribe(
                (data) => {
                    console.log(data);
                    this.authService.setToken(data.token);
                    this.router.navigate(['/home']);
                    Swal.fire({
                        icon: 'success',
                        title: 'Connexion reussie',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
                (error) => {
                    console.log(error);
                    this.toastr.error('Connexion échouée', 'Veuillez verifier vos identifiants', {
                        timeOut: 2000,
                        positionClass: 'toast-top-right'
                      });
                }
            );
        }
      }
}
