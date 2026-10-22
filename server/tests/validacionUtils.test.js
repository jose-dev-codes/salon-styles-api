import { test } from "node:test";
import assert from "node:assert/strict";

import {
    obtenerError,
    esFechaValida,
    crearRequisitosFecha,
    crearRequisitosNombre,
    obtenerFechaActual
} from "../src/utils/validacionUtils.js";

test("obtenerError devuelve null cuando todos los requisitos se cumplen", () => {
    const requisitos = [
        { condicion: true, mensaje: "El nombre es obligatorio." },
        { condicion: true, mensaje: "El nombre no es válido." }
    ];

    const resultado = obtenerError(requisitos);

    assert.equal(resultado, null);
});

test("obtenerError devuelve el mensaje del primer requisito incumplido", () => {
    const requisitos = [
        { condicion: true, mensaje: "El nombre es obligatorio." },
        { condicion: false, mensaje: "El nombre no es válido." },
        { condicion: false, mensaje: "El nombre es demasiado largo." }
    ];

    const resultado = obtenerError(requisitos);

    assert.equal(resultado, "El nombre no es válido.");
});

test("obtenerError devuelve el mensaje del primer requisito cuando todos fallan", () => {
    const requisitos = [
        { condicion: false, mensaje: "El nombre es obligatorio." },
        { condicion: false, mensaje: "El nombre no es válido." },
        { condicion: false, mensaje: "El nombre es demasiado largo." }
    ];

    const resultado = obtenerError(requisitos);

    assert.equal(resultado, "El nombre es obligatorio.");
});


test("esFechaValida acepta una fecha válida", () => {
    const resultado = esFechaValida("2024-02-29");

    assert.equal(resultado, true);
});

test("esFechaValida rechaza una fecha inexistente", () => {
    const resultado = esFechaValida("2025-02-29");

    assert.equal(resultado, false);
});

test("crearRequisitosFecha genera requisitos cumplidos para una fecha válida", () => {
    const requisitos = crearRequisitosFecha("2024-02-29", "Fecha de nacimiento");

    assert.equal(requisitos.length, 3);
    assert.equal(requisitos.every(requisito => requisito.condicion), true);
    assert.equal(obtenerError(requisitos), null);
});

test("crearRequisitosFecha rechaza una fecha con formato incorrecto", () => {
    const requisitos = crearRequisitosFecha("15/03/2000", "Fecha de nacimiento");

    assert.equal(requisitos[0].condicion, true);
    assert.equal(requisitos[1].condicion, false);
    assert.equal(
        obtenerError(requisitos),
        "Fecha de nacimiento debe tener el formato AAAA-MM-DD."
    );
});

test("crearRequisitosNombre genera requisitos cumplidos para un nombre válido", () => {
    const requisitos = crearRequisitosNombre("Laura Marcela", "Nombres");

    assert.equal(requisitos.length, 3);
    assert.equal(requisitos.every(requisito => requisito.condicion), true);
    assert.equal(obtenerError(requisitos), null);
});

test("crearRequisitosNombre rechaza un nombre con números", () => {
    const requisitos = crearRequisitosNombre("Laura123", "Nombres");

    assert.equal(requisitos[0].condicion, true);
    assert.equal(requisitos[1].condicion, true);
    assert.equal(requisitos[2].condicion, false);
    assert.equal(
        obtenerError(requisitos),
        "Nombres solo puede contener letras, espacios y apóstrofes."
    );
});

test("crearRequisitosNombre rechaza un nombre vacío", () => {
    const requisitos = crearRequisitosNombre("", "Nombres");

    assert.equal(requisitos[0].condicion, false);
    assert.equal(requisitos[1].condicion, false);
    assert.equal(requisitos[2].condicion, false);
    assert.equal(
        obtenerError(requisitos),
        "Nombres son obligatorios."
    );
});

test("crearRequisitosNombre rechaza un nombre demasiado corto", () => {
    const requisitos = crearRequisitosNombre("A", "Nombres");

    assert.equal(requisitos[0].condicion, true);
    assert.equal(requisitos[1].condicion, false);
    assert.equal(requisitos[2].condicion, true);
    assert.equal(
        obtenerError(requisitos),
        "Nombres deben tener entre 2 y 50 caracteres."
    );
});

test("crearRequisitosNombre rechaza un nombre demasiado largo", () => {
    const nombre = "A".repeat(51);
    const requisitos = crearRequisitosNombre(nombre, "Nombres");

    assert.equal(requisitos[0].condicion, true);
    assert.equal(requisitos[1].condicion, false);
    assert.equal(requisitos[2].condicion, true);
    assert.equal(
        obtenerError(requisitos),
        "Nombres deben tener entre 2 y 50 caracteres."
    );
});

test("crearRequisitosNombre acepta nombres con espacios y apóstrofes", () => {
    const nombresValidos = [
        "María José",
        "O'Connor"
    ];

    for (const nombre of nombresValidos) {
        const requisitos = crearRequisitosNombre(nombre, "Nombres");

        assert.equal(
            obtenerError(requisitos),
            null,
            `El nombre "${nombre}" debería ser válido.`
        );
    }
});

test("crearRequisitosNombre rechaza nombres con caracteres especiales", () => {
    const requisitos = crearRequisitosNombre("Laura@", "Nombres");

    assert.equal(requisitos[0].condicion, true);
    assert.equal(requisitos[1].condicion, true);
    assert.equal(requisitos[2].condicion, false);
    assert.equal(
        obtenerError(requisitos),
        "Nombres solo puede contener letras, espacios y apóstrofes."
    );
});

test("obtenerFechaActual devuelve una fecha con formato AAAA-MM-DD", () => {
    const fecha = obtenerFechaActual();

    assert.match(fecha, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(esFechaValida(fecha), true);
});

test("crearRequisitosFecha rechaza una fecha vacía", () => {
    const requisitos = crearRequisitosFecha("", "Fecha de nacimiento");

    assert.equal(requisitos[0].condicion, false);
    assert.equal(
        obtenerError(requisitos),
        "Fecha de nacimiento es obligatoria."
    );
});

test("crearRequisitosFecha rechaza una fecha inexistente", () => {
    const requisitos = crearRequisitosFecha(
        "2025-02-30",
        "Fecha de nacimiento"
    );

    assert.equal(requisitos[0].condicion, true);
    assert.equal(requisitos[1].condicion, true);
    assert.equal(requisitos[2].condicion, false);
    assert.equal(
        obtenerError(requisitos),
        "Fecha de nacimiento no es válida."
    );
});

test("crearRequisitosFecha rechaza fechas con formato incorrecto", () => {
    const requisitos = crearRequisitosFecha(
        "15/03/2000",
        "Fecha de nacimiento"
    );

    assert.equal(requisitos[0].condicion, true);
    assert.equal(requisitos[1].condicion, false);
    assert.equal(
        obtenerError(requisitos),
        "Fecha de nacimiento debe tener el formato AAAA-MM-DD."
    );
});
