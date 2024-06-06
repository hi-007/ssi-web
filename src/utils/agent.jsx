import axios from "axios";

export async function createInvitation(agentUrl, key) {
    const url = `${agentUrl}/connections/create-invitation`;
    try {
        const response = await axios.post(url, null, {
            headers: { "x-api-key": key, apikey: key },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export async function deleteConnection(
    agentUrl,
    key,
    connection_id
) {
    const url = `${agentUrl}/connections/${connection_id}`;
    try {
        await axios.delete(url, {
            headers: { "x-api-key": key, apikey: key },
            signal: AbortSignal.timeout(5000),
        });
        console.log("delete connection=" + connection_id);
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

export async function getConnections(agentUrl, key) {
    const url = `${agentUrl}/connections`;
    try {
        const result = await axios.get(url, {
            headers: { "x-api-key": key, apikey: key },
            signal: AbortSignal.timeout(5000),
        });
        //console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export async function isConnectionActive(
    agentUrl,
    key,
    connectionId
) {
    const url = `${agentUrl}/connections/${connectionId}`;
    try {
        const response = await axios.get(url, {
            headers: { "x-api-key": key, apikey: key },
        });
        console.log(response.data);
        if (response.data["state"] == "active") return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

export async function createSchema(
    agentUrl,
    key,
    data
) {
    const url = `${agentUrl}/schemas`;
    console.log("data=" + JSON.stringify(data));
    try {
        return await axios.post(url, data, {
            headers: { "x-api-key": key, apikey: key },
            signal: AbortSignal.timeout(5000),
        });
    } catch (error) {
        console.log(error);
    }
    return false;
}

export async function getSchemas(agentUrl, key) {
    const url = `${agentUrl}/schemas/created`;
    try {
        return await axios.get(url, {
            headers: { "x-api-key": key, apikey: key },
            signal: AbortSignal.timeout(5000),
        });
    } catch (error) {
        console.log(error);
    }
    return false;
}

export async function getCredDefs(agentUrl, key) {
    const url = `${agentUrl}/credential-definitions/created`;
    try {
        return await axios.get(url, {
            headers: { "x-api-key": key, apikey: key },
            signal: AbortSignal.timeout(5000),
        });
    } catch (error) {
        console.log(error);
    }
    return false;
}

export async function createCredDefs(
    agentUrl,
    key,
    data
) {
    const url = `${agentUrl}/credential-definitions`;
    console.log("data=" + JSON.stringify(data));
    try {
        return await axios.post(url, data, {
            headers: { "x-api-key": key, apikey: key },
            signal: AbortSignal.timeout(5000),
        });
    } catch (error) {
        console.log(error);
    }
    return false;
}

export function createAttributes(data) {
    const attrs = [];
    Object.entries(data).forEach(([key, value]) => {
        if (key != "address") {
            const obj = { name: key, value: String(value) };
            attrs.push(obj);
        }
    });
    return attrs;
}

export function createOffer(
    connection_id,
    cred_defs_id,
    data,
    comment = ""
) {
    console.log("comment = " + comment);
    const attributes = createAttributes(data);
    const offer = {
        comment: comment,
        trace: true,
        connection_id: connection_id,
        credential_preview: {
            "@type": "issue-credential/1.0/credential-preview",
            attributes: attributes,
        },
        cred_def_id: cred_defs_id,
        auto_remove: true,
        auto_issue: true,
    };
    return offer;
}

export async function sendOffer(agentUrl, key, offerDoc) {
    const url = `${agentUrl}/issue-credential/send-offer`;
    try {
        const response = await axios.post(url, offerDoc, {
            headers: { "x-api-key": key, apikey: key },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export function createPresentation(
    credDefId,
    proofName,
    connectionId,
    reqAttrs,
    reqPreds,
    comment = ""
) {
    // create request attributes
    const attrs = {};
    reqAttrs.forEach((e) => {
        console.log(e);
        attrs[e] = {
            name: e,
            restrictions: [{ cred_def_id: credDefId }],
        };
    });

    // create request predicates
    const preds = {};
    reqPreds.forEach((e) => {
        preds[e.name] = {
            name: e.name,
            p_type: e.type,
            p_value: e.value,
            restrictions: [{ cred_def_id: credDefId }],
        };
    });

    // create proof request
    const proofReq = {};
    proofReq["name"] = proofName;
    proofReq["requested_attributes"] = attrs;
    proofReq["requested_predicates"] = preds;
    proofReq["version"] = "1.0";

    // create presetentation
    const presentation= {};
    presentation["comment"] = comment;
    presentation["connection_id"] = connectionId;
    presentation["proof_request"] = proofReq;
    return presentation;
}

export async function sendPresentationRequest(
    agentUrl,
    key,
    presentationDoc
) {
    const url = `${agentUrl}/present-proof/send-request`;
    try {
        const response = await axios.post(url, presentationDoc, {
            headers: { "x-api-key": key, apikey: key },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const getProofRecords = async (agentUrl, key) => {
    const url = `${agentUrl}/present-proof/records`;
    try {
        const response = await axios.get(url, {
            headers: { "x-api-key": key, apikey: key },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return null;
};

export const deleteProofRecord = async (
    agentUrl,
    key,
    pres_ex_id
) => {
    const url = `${agentUrl}/present-proof/records/${pres_ex_id}`;
    try {
        const response = await axios.delete(url, {
            headers: { "x-api-key": key, apikey: key },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return null;
};

export async function getRevealedAttrs(
    agentUrl,
    key,
    pres_ex_id
) {
    const url = `${agentUrl}/present-proof/records/${pres_ex_id}`;
    try {
        const response = await axios.get(url, {
            headers: { "x-api-key": key, apikey: key },
        });

        console.log(
            JSON.stringify({
                headers: { "x-api-key": key, apikey: key },
            })
        );
        if (response.data["state"] === "verified") {
            return response.data["presentation"]["requested_proof"][
                "revealed_attrs"
            ];
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const getIssuedCredentialRecords = async (
    agentUrl,
    key
) => {
    const url = `${agentUrl}/issue-credential/records`;
    console.log("url=" + url);
    try {
        const response = await axios.get(url, {
            headers: { "x-api-key": key, apikey: key },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return null;
};

export const deleteIssuedCredentialRecord = async (
    agentUrl,
    key,
    cred_ex_id
) => {
    const url = `${agentUrl}/issue-credential/records/${cred_ex_id}`;
    try {
        const response = await axios.delete(url, {
            headers: { "x-api-key": key, apikey: key },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return null;
};
