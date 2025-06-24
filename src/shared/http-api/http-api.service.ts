import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpApiService {
    private readonly httpService: HttpService;
    private readonly baseUrl: string;
    private readonly headers: RawAxiosRequestHeaders;
    private readonly axiosConfig: AxiosRequestConfig;

    constructor(private readonly _httpService: HttpService) {
        this.httpService = _httpService;
        this.baseUrl = process.env.API_URL || 'http://localhost:3001';
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        this.axiosConfig = {
            headers: this.headers,
        };
    }

    get<T>(url: string, options?: AxiosRequestConfig): Observable<T> {
        console.log(`${this.baseUrl}${url}`);
        return this.httpService.get<T>(`${this.baseUrl}${url}`, {
            ...this.axiosConfig,
            ...options,
        }).pipe(
            map(response => response.data)
        );
    }

    post<T>(url: string, data: any, options?: AxiosRequestConfig): Observable<T> {
        return this.httpService.post<T>(`${this.baseUrl}${url}`, data, {
            ...this.axiosConfig,
            ...options,
        }).pipe(
            map(response => response.data)
        );
    }

    put<T>(url: string, data: any, options?: AxiosRequestConfig): Observable<T> {
        return this.httpService.put<T>(`${this.baseUrl}${url}`, data, {
            ...this.axiosConfig,
            ...options,
        }).pipe(
            map(response => response.data)
        );
    }

    delete<T>(url: string, options?: AxiosRequestConfig): Observable<T> {
        return this.httpService.delete<T>(`${this.baseUrl}${url}`, {
            ...this.axiosConfig,
            ...options,
        }).pipe(
            map(response => response.data)
        );
    }

    patch<T>(url: string, data: any, options?: AxiosRequestConfig): Observable<T> {
        return this.httpService.patch<T>(`${this.baseUrl}${url}`, data, {
            ...this.axiosConfig,
            ...options,
        }).pipe(
            map(response => response.data)
        );
    }
}
