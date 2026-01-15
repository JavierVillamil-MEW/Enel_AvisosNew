/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard-scss"],
  plugins: [
		"stylelint-order"
	],
  rules: {
    "order/order": [
      "custom-properties",
      {
        "type": "at-rule",
        "hasBlock": false
      },
      "declarations",
      {
        "type": "at-rule",
        "hasBlock": true
      },
      {
        "type": "at-rule",
        "hasBlock": false,
        "name": "return"
      }
		],
    "order/properties-order": [
			"width",
			"height"
		]
  },
};
