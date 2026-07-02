import { API_BASEURL } from '@ENV/manager';
import { httpDeleteCall, httpGetRequest, httpPostRequest, httpPuCall } from '@Helper/httpCalls';
import { createUserPayload, updateUserPayload } from '@Resources/faker';
import userSchema from '@Schema/user.json';
import { endpoint } from '@Services/endpoints';
import { User } from '@Types/user';
import { expect, use } from 'chai';
// eslint-disable-next-line @typescript-eslint/no-var-requires
use(require('chai-json-schema'));

describe('Test JSONPlaceholder /USERS', function () {

    const knownUserId = 1;

    it('should validate get users', async function () {
        const response = await httpGetRequest({
            baseUrl: API_BASEURL,
            endpoint: endpoint.users,
            context: this
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.not.be.empty;
        expect(response.body[0]).to.be.jsonSchema(userSchema);
    });

    it('should validate get user by id', async function () {
        const response = await httpGetRequest({
            baseUrl: API_BASEURL,
            endpoint: `${endpoint.users}/${knownUserId}`,
            context: this
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.jsonSchema(userSchema);
        expect(response.body.id).to.equal(knownUserId);
    });

    it('should validate get users with query parameter', async function () {
        const userQueryParams = {
            _limit: 5
        };

        const response = await httpGetRequest({
            baseUrl: API_BASEURL,
            endpoint: endpoint.users,
            query: userQueryParams,
            context: this
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.lengthOf(userQueryParams._limit);

        response.body.forEach((user: User) => {
            expect(user.id).to.satisfy(Number.isInteger);
            expect(user.name).to.be.a('string');
            expect(user.email).to.be.a('string');
        });
    });

    it('should validate create user', async function () {
        const response = await httpPostRequest({
            baseUrl: API_BASEURL,
            endpoint: endpoint.users,
            payload: createUserPayload,
            context: this
        });

        expect(response.statusCode).to.equal(201);
        expect(response.body.name).to.equal(createUserPayload.name);
        expect(response.body.username).to.equal(createUserPayload.username);
        expect(response.body.email).to.equal(createUserPayload.email);
        expect(response.body.id).to.be.a('number');
    });

    it('should validate update user by id', async function () {
        const response = await httpPuCall({
            baseUrl: API_BASEURL,
            endpoint: `${endpoint.users}/${knownUserId}`,
            payload: updateUserPayload,
            context: this
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.name).to.equal(updateUserPayload.name);
        expect(response.body.email).to.equal(updateUserPayload.email);
        expect(response.body.id).to.equal(knownUserId);
    });

    it('should validate delete user by id', async function () {
        const response = await httpDeleteCall({
            baseUrl: API_BASEURL,
            endpoint: `${endpoint.users}/${knownUserId}`,
            context: this
        });

        expect(response.statusCode).to.equal(200);
    });

});
