import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent {
  validateEmailForm: FormGroup;
  email: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.validateEmailForm = this.fb.group({
      validationCode: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  onSubmit() {
    if (this.validateEmailForm.valid) {
      this.authService.validateAccount(this.email, this.validateEmailForm.value.validationCode).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: err => {
          this.errorMessage = 'Invalid validation code.';
          console.error('Validation error', err);
        }
      });
    }
  }

}
