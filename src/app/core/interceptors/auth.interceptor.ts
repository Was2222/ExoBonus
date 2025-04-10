import type { HttpInterceptorFn } from "@angular/common/http"
import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"
import { catchError, throwError } from "rxjs"
import { Router } from "@angular/router"

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  // Add headers if needed
  // Currently, the backend doesn't use tokens, but we can prepare for it

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout()
        router.navigate(["/login"])
      }
      return throwError(() => error)
    }),
  )
}

