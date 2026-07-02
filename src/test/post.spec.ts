import { API_BASEURL } from '@ENV/manager';
import { httpGetRequest, httpPostRequest } from '@Helper/httpCalls';
import { validPostPayload } from '@Resources/faker';
import { endpoint } from '@Services/endpoints';
import { Post } from '@Types/user';
import { expect } from 'chai';

describe('Test JSONPlaceholder /POSTS', function () {

    const userId = 1;

    describe('positive scenarios', function () {
        const knownPostId = 1;

        it('should validate create post', async function () {
            const payload = validPostPayload(userId);
            const response = await httpPostRequest({
                baseUrl: API_BASEURL,
                endpoint: endpoint.posts,
                payload,
                context: this
            });

            expect(response.statusCode).to.be.eq(201);
            expect(response.body.title).to.equal(payload.title);
            expect(response.body.body).to.equal(payload.body);
            expect(response.body.userId).to.equal(userId);
            expect(response.body.id).to.be.a('number');
        });

        it('should validate get post by id', async function () {
            const response = await httpGetRequest({
                baseUrl: API_BASEURL,
                endpoint: `${endpoint.posts}/${knownPostId}`,
                context: this
            });

            expect(response.statusCode).to.be.eq(200);
            expect(response.body.id).to.be.eq(knownPostId);
        });

        it('should validate get posts filtered by user id', async function () {
            const response = await httpGetRequest({
                baseUrl: API_BASEURL,
                endpoint: endpoint.posts,
                query: { userId },
                context: this
            });

            expect(response.statusCode).to.be.eq(200);
            expect(response.body).to.not.be.empty;

            response.body.forEach((post: Post) => {
                expect(post.userId).to.equal(userId);
            });
        });
    });

    describe('negative scenarios', function () {

        it('should validate 404 when post id does not exist', async function () {
            const response = await httpGetRequest({
                baseUrl: API_BASEURL,
                endpoint: `${endpoint.posts}/99999`,
                context: this
            });

            expect(response.statusCode).to.be.eq(404);
        });

        it('should validate 404 when endpoint is invalid', async function () {
            const response = await httpGetRequest({
                baseUrl: API_BASEURL,
                endpoint: '/invalid-endpoint',
                context: this
            });

            expect(response.statusCode).to.be.eq(404);
        });

    });
});
